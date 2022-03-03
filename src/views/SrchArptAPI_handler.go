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

		rows, err := db.Raw("select * from srch_arpt_apis where airport_code = ?", req.ArptSrchString).Rows()
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
