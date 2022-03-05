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

func Payment(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.PayRes
		var req models.PayReq
		var emreq models.EmailReq
		var emres models.EmailRes

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("dest name : ", req.CustomerName)
		emreq.Email = req.EmailAdd
		postBody, _ := json.Marshal(emreq)
		reqBody := bytes.NewBuffer(postBody)

		resp, err := http.Post("http://localhost:8080/email", "application/json", reqBody)
		if err != nil {
			log.Println("An Error Occured calling email api ", err)
		}

		decoder := json.NewDecoder(resp.Body)
		decoder.Decode(&emres)

		log.Println("data response : ", emres.EmailStatus)
		if emres.EmailStatus == "success" {
			res.ErrorCode = ""
			res.Status = "success"
			res.OtpCode = emres.Code
		} else {
			res.ErrorCode = ""
			res.Status = "failure"
			res.OtpCode = ""
		}

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
