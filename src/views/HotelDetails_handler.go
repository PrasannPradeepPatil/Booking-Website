package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HotelDetails(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.HotelDetailsRes
		var req models.DetailsReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("ID : ", req.ID)
		db.Raw("select city,state,Hotelname,rating,StandardPrice,Address,Amenities,ID from HotelData where ID = ?", req.ID).Scan(&res)

		log.Println("response value : ", res.City+" "+res.State+" "+res.HotelName+" "+res.Address+" "+res.Rating+" "+res.Amenities)
		if res.City == "" {
			c.JSON(http.StatusOK, "No hotel details available for this ID")
		} else {
			c.JSON(http.StatusOK, res)
		}

	}

	return gin.HandlerFunc(fn)
}
