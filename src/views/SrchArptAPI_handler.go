package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SrchArptAPI(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json []models.SrchArptAPI
		var req models.SrchArptReq

		if err := c.BindJSON(&req); err != nil {
			log.Println("Error in req parsing")
		}
		log.Println(req.ArptSrchString)
		var qs = req.ArptSrchString + "%"
		log.Println(qs)

		rows, err := db.Raw("select cityname,airportcode,airportname,countryname from srch_arpt where airportcode like ? or airportname like ? or cityname like ?", req.ArptSrchString, qs, qs).Rows()
		log.Println(rows.Columns())
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}

		for rows.Next() {
			db.ScanRows(rows, &json)

		}

		log.Println(json)

		c.JSON(http.StatusOK, json)
	}

	return gin.HandlerFunc(fn)
}
