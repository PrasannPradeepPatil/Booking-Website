package views

import (
	"log"
	"net/http"
	"strings"

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

		var query string
		//base query
		query = "select city,state,Hotelname,rating,standardprice,id from HotelData where city = \"" + req.City + "\" and state = \"" + req.State + "\""
		log.Println("Base query: " + query)

		//min rating filter
		if req.Minrating != "" {
			log.Println("Price range minimum limit is : ", req.Minrating)
			query = query + " and rating >= " + req.Minrating
		}

		//Price range filter
		if req.MinPriceRange != "" {
			log.Println("min price limit : " + req.MinPriceRange)
			query = query + " and standardprice >= " + req.MinPriceRange
		}
		if req.Maxpricerange != "" {
			log.Println("max price limit : " + req.Maxpricerange)
			query = query + " and standardprice <= " + req.Maxpricerange
		}

		//filtering conditions
		if req.Pricefilter != "" || req.Ratingfilter != "" {
			query = query + " order by"
			if req.Pricefilter == "A" {
				query = query + " Standardprice,"
			} else if req.Pricefilter == "D" {
				query = query + " standardprice desc,"
			}
			if req.Ratingfilter == "A" {
				query = query + " rating,"
			} else if req.Ratingfilter == "D" {
				query = query + " rating desc,"
			}
			query = strings.TrimSuffix(query, ",")
		}

		log.Println("Final query after filter checks :" + query)

		rows, err := db.Raw(query).Rows()
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
