package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SrchCity(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res []models.CitySearchRes
		var req models.CitySearchReq

		if err := c.BindJSON(&req); err != nil {
			log.Println("Error in req parsing")
		}
		log.Println(req.SrchStr)
		var qs = req.SrchStr + "%"
		log.Println(qs)

		rows, err := db.Raw("select * from CitySearch where city like ?", qs).Rows()
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}

		for rows.Next() {
			db.ScanRows(rows, &res)

		}

		log.Println("cities available are : ", res)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
