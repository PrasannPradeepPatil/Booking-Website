package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HotelSearch(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res []models.HotelSearchRes
		var req models.HotelSearchReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("Hotel Search request : ", req.City+" ", req.State+" "+req.Checkin+" "+req.Checkout+" "+req.Pricefilter+" "+req.Ratingfilter)

		rows, err := db.Raw("select city,state,Hotelname,rating,standardprice,id from HotelData where city = ? and state=?", req.City, req.State).Rows()
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}
		for rows.Next() {
			db.ScanRows(rows, &res)

		}

		log.Println(res)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
