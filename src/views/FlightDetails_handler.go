package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FlightDetails(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.FlightDetailsRes
		var req models.DetailsReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("ID : ", req.ID)
		db.Raw("select Boardingtime,Checkinluggage,Cabin,Cancellation from searches where ID = ?", req.ID).Scan(&res)

		log.Println("response value : ", res.Boardingtime+" "+res.Checkinluggage+" "+res.Cabin+" "+res.Cancellation)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
