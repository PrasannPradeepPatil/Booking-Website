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

		log.Println("dest name : ", req.Email)

		rando := EncodeToString(6)
		mailBody := "Dear Customer,\n\nPlease enter the below OTP for authentication.\n\n" + rando

		from := "ahamadshaik333@gmail.com"
		pass := "dbwbktkxgfshnasc"
		to := req.Email

		msg := "From: " + from + "\n" +
			"To: " + to + "\n" +
			"Subject: OTP\n\n" +
			mailBody

		err := smtp.SendMail("smtp.gmail.com:587",
			smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
			from, []string{to}, []byte(msg))

		if err != nil {
			log.Printf("smtp error: %s", err)
			json.EmailStatus = "Failure to send Email" + err.Error()

		}
		if err == nil {
			json.Code = rando
			json.EmailStatus = "success"
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
