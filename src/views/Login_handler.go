package views

import (
	"encoding/base64"
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Login(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.LoginRes
		var req models.LoginReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		encPass := base64.StdEncoding.EncodeToString([]byte(req.Password))

		log.Println("ID : ", req.EmailID)
		db.Raw("select userid from UserInfo where EmailID = ? and Password = ?", req.EmailID, encPass).Scan(&res)

		if res.UserId != "" {
			res.LoginStatus = "success"
			res.Error = ""
		} else {
			res.LoginStatus = "failure"
			res.Error = "Username and Password Mismatch! Please try again"
		}

		log.Println("response value : ", res.LoginStatus+" "+res.UserId+" "+res.Error)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
