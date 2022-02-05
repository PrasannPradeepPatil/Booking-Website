package main

import (
	m "github.com/PrasannPradeepPatil/Booking-Website/src/models"
	v "github.com/PrasannPradeepPatil/Booking-Website/src/views"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {

	db, err := gorm.Open(sqlite.Open("flights.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&m.Search{})
	db.AutoMigrate(&m.SrchArptAPI{})

	x := gin.New()

	x.POST("/searchFlights", v.SearchFlights(db))
	x.GET("/searchFlights", v.SearchFlights(db))

	x.POST("/SrchArptAPI", v.SrchArptAPI(db))
	x.GET("/SrchArptAPI", v.SrchArptAPI(db))

	x.Run(":8080")
}
