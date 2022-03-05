package main

import (
	"log"

	m "github.com/PrasannPradeepPatil/Booking-Website/src/models"
	v "github.com/PrasannPradeepPatil/Booking-Website/src/views"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {

	db, err := gorm.Open(sqlite.Open("flights.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database ")
	}
	log.Printf(db.Name())

	db.AutoMigrate(&m.Search{})
	db.AutoMigrate(&m.SrchArptAPI{})
	db.AutoMigrate(&m.EmailRes{})

	x := gin.New()

	x.POST("/booking/searchFlights", v.SearchFlights(db))
	x.GET("/booking/searchFlights", v.SearchFlights(db))

	x.POST("/booking/SrchArptAPI", v.SrchArptAPI(db))
	x.GET("/booking/SrchArptAPI", v.SrchArptAPI(db))

	x.POST("/booking/email", v.Email(db))
	x.GET("/booking/email", v.Email(db))

	x.POST("/booking/payment", v.Payment(db))
	x.GET("/booking/payment", v.Payment(db))

	x.POST("/booking/price", v.Price(db))
	x.GET("/booking/price", v.Price(db))

	x.Run(":8080")
}
