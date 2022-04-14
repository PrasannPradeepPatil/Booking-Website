package views

import (
	"crypto/rand"
	"io"
	"log"
	"net/http"
	"net/smtp"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Email(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.EmailRes
		var req models.EmailReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("emailAddress: ", req.EmailAdd)
		log.Println("mail Type: ", req.MailType)
		mailBody := ""
		subject := ""
		rando := EncodeToString(6)

		if req.MailType == "FOTP" {
			mailBody = "Dear Customer,\n\nPlease enter the below OTP for authentication to finish booking your flight .\n\n" + rando
			subject = "Flight Booking OTP"
		}

		if req.MailType == "HOTP" {
			mailBody = "Dear Customer,\n\nPlease enter the below OTP for authentication to finish booking your hotel .\n\n" + rando
			subject = "Hotel Booking OTP"
		}

		if req.MailType == "FCONF" {
			mailBody = "Dear Customer,\n\nPlease find the confirmed booking details of your flight below.\n\n" + "Reference Number : " + req.ReferenceNumber + "\nCustomer Name : " + req.CustomerName + "\nSource : " + req.Source + "\nDestination : " + req.Destination + "\nTravel Date/s : " + req.DateOfBooking + "\n\n"
			subject = "Flight Booking Confirmation"
		}

		if req.MailType == "HCONF" {
			mailBody = "Dear Customer,\n\nPlease find the confirmed booking details of your hotel below.\n\n" + "Reference Number : " + req.ReferenceNumber + "\nCustomer Name : " + req.CustomerName + "\nHotel Name : " + req.Destination + "\nCity : " + req.BookingCity + "\nBooking Date/s : " + req.DateOfBooking + "\n\n"
			subject = "Hotel Booking Confirmation"
		}

		from := "bookingprohelpdesk@gmail.com"
		pass := "bsnumxkhfsemczan"
		to := req.EmailAdd

		msg := "From: " + from + "\n" +
			"To: " + to + "\n" +
			"subject: " + subject + "\n\n" +
			mailBody

		err := smtp.SendMail("smtp.gmail.com:587",
			smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
			from, []string{to}, []byte(msg))

		if err != nil {
			log.Printf("smtp error: %s", err)
			json.EmailStatus = "failure"
			json.ErrorCode = err.Error()

		}
		if err == nil {
			if req.MailType[len(req.MailType)-3:] == "OTP" {
				json.OtpCode = rando
				json.EmailStatus = "success"
			}
			if req.MailType[len(req.MailType)-4:] == "CONF" {
				json.EmailStatus = "success"
			}
		}
		log.Print("Gmail sent")

		c.JSON(http.StatusOK, json)
	}

	return gin.HandlerFunc(fn)
}

func EncodeToString(max int) string {
	b := make([]byte, max)
	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if n != max {
		panic(err)
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}
