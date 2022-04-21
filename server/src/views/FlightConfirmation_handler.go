package views

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FlightConfirmation(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.FlightConfirmationRes
		var req models.FlightConfirmationReq
		var emreq models.EmailReq
		var emres models.EmailRes

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("code verification status : ", req.CodeStatus)
		if req.CodeStatus == "Success" {

			refnum := EncodeToString(10)
			log.Println("ref numb generated : " + refnum)
			// refnum := "1487965784"

			emreq.EmailAdd = req.EmailAdd
			emreq.CustomerName = req.CustomerName
			emreq.DateOfBooking = req.BookingDates
			emreq.MailType = "FCONF"
			emreq.ReferenceNumber = refnum
			emreq.Source = req.Source
			emreq.Destination = req.Destination

			postBody, _ := json.Marshal(emreq)
			reqBody := bytes.NewBuffer(postBody)
			resp, err := http.Post("http://localhost:8080/booking/email", "application/json", reqBody)
			if err != nil {
				log.Println("An Error Occured calling email api ", err)
			}

			decoder := json.NewDecoder(resp.Body)
			decoder.Decode(&emres)
			bookingType := "Flight"
			MailStatus := emres.EmailStatus

			query := "insert into Customerdata(Referencenumber,Customername,EmailAdd,Mobilenumber,Bookingdates,Source,Destination,BookingType,ID,ConfirmationMailStatus) values (?,?,?,?,?,?,?,?,?,?)"
			count := db.Exec(query, refnum, req.CustomerName, req.EmailAdd, req.MobileNumber, req.BookingDates, req.Source, req.Destination, bookingType, req.ID, MailStatus).RowsAffected
			log.Println("Rows inserted : ", count)
			if count > 0 {
				res.Apistatus = "success"
				res.Emailstatus = emres.EmailStatus
				res.Errorcode = ""
				res.ReferenceNumber = refnum
			}
			if count < 0 {
				res.Apistatus = "insertion failure"
				res.Emailstatus = emres.EmailStatus
				res.Errorcode = ""
				res.ReferenceNumber = ""
			}

		}

		if req.CodeStatus == "Fail" {
			res.Apistatus = "cannot insert data into db"
			res.Emailstatus = "Cannot send email"
			res.Errorcode = "Please retry payment as  code authentication failed"
			res.ReferenceNumber = ""
		}

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
