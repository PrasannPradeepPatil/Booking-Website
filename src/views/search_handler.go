package views

import (
	"encoding/base64"
	"io/ioutil"
	"log"
	"net/http"
	"os"

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

		rows, err := db.Raw("select * from searches where source_airport = ? and destination_airport=?", req.SourceName, req.DestinationName).Rows()
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}
		path, err := os.Getwd()
		log.Println("direc : ", path)
		byte, err := ioutil.ReadFile(path + "\\images\\AA.jpg")
		if err != nil {
			log.Println("error in loading image ", err)
		}
		var base64encod string
		base64encod += "data:image/jpg;base64"
		base64encod += base64.StdEncoding.EncodeToString(byte)
		log.Println("img ", base64encod)

		for rows.Next() {
			db.ScanRows(rows, &json)

		}

		log.Println(json)

		c.JSON(http.StatusOK, json)
	}
	return gin.HandlerFunc(fn)
}
