package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SearchFlights(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json []models.Search
		var req models.SearchReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("dest name : ", req.DestinationName)

		scity := ""
		dcity := ""
		rows, err := db.Raw("select * from searches where sourceairportcode = ? and destinationairportcode=?", req.SourceName, req.DestinationName).Rows()
		db.Raw("select cityname from srch_arpt where airportcode = ?", req.SourceName).Scan(&scity)
		db.Raw("select cityname from srch_arpt where airportcode = ?", req.DestinationName).Scan(&dcity)
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}

		for rows.Next() {
			db.ScanRows(rows, &json)

		}

		for i := 0; i < len(json); i++ {
			json[i].Sourcecity = scity
			json[i].Destinationcity = dcity

		}

		log.Println(json)

		c.JSON(http.StatusOK, json)
	}

	return gin.HandlerFunc(fn)
}
