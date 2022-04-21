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

func HotelConfirmation(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.HotelConfirmationRes
		var req models.HotelConfirmationReq
		var emreq models.EmailReq
		var emres models.EmailRes

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("code verification status : ", req.CodeStatus)
		if req.CodeStatus == "Success" {
			refnum := EncodeToString(10)
			log.Println("Refnum for hotel booking : " + refnum)

			emreq.EmailAdd = req.EmailAdd
			emreq.CustomerName = req.CustomerName
			emreq.DateOfBooking = req.BookingDates
			emreq.MailType = "HCONF"
			emreq.ReferenceNumber = refnum
			// emreq.Source = req.Source
			emreq.Destination = req.HotelName
			emreq.BookingCity = req.City + ", " + req.State

			postBody, _ := json.Marshal(emreq)
			reqBody := bytes.NewBuffer(postBody)
			resp, err := http.Post("http://localhost:8080/booking/email", "application/json", reqBody)
			if err != nil {
				log.Println("An Error Occured calling email api ", err)
			}

			decoder := json.NewDecoder(resp.Body)
			decoder.Decode(&emres)
			bookingType := "Hotel"
			MailStatus := emres.EmailStatus

			query := "insert into Customerdata(Referencenumber,Customername,EmailAdd,Mobilenumber,Bookingdates,HotelName,city,state,BookingType,ID,ConfirmationMailStatus) values (?,?,?,?,?,?,?,?,?,?,?)"
			count := db.Exec(query, refnum, req.CustomerName, req.EmailAdd, req.MobileNumber, req.BookingDates, req.HotelName, req.City, req.State, bookingType, req.ID, MailStatus).RowsAffected
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
			}

		}

		if req.CodeStatus == "Fail" {
			res.Apistatus = "cannot insert data into db"
			res.Emailstatus = "Cannot send email"
			res.Errorcode = "Please retry payment as  code authentication failed"
		}

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
