package main

import (
	"log"
	"os"

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

	file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}
	log.SetOutput(file)

	log.Printf(db.Name())

	db.AutoMigrate(&m.Search{})
	db.AutoMigrate(&m.SrchArptAPI{})
	db.AutoMigrate(&m.EmailRes{})

	x := gin.New()

	x.POST("/booking/searchFlights", v.SearchFlights(db))
	x.GET("/booking/searchFlights", v.SearchFlights(db))

	x.POST("/booking/searchRTFlights", v.RoundTripSearchFlights(db))
	x.GET("/booking/searchRTFlights", v.RoundTripSearchFlights(db))

	x.POST("/booking/SrchArptAPI", v.SrchArptAPI(db))
	x.GET("/booking/SrchArptAPI", v.SrchArptAPI(db))

	x.POST("/booking/email", v.Email(db))
	x.GET("/booking/email", v.Email(db))

	x.POST("/booking/payment", v.Payment(db))
	x.GET("/booking/payment", v.Payment(db))

	x.POST("/booking/price", v.Price(db))
	x.GET("/booking/price", v.Price(db))

	x.POST("/booking/flightDetails", v.FlightDetails(db))
	x.GET("/booking/flightDetails", v.FlightDetails(db))

	x.POST("/booking/citySearch", v.SrchCity(db))
	x.GET("/booking/citySearch", v.SrchCity(db))

	x.POST("/booking/hotelSearch", v.HotelSearch(db))
	x.GET("/booking/hotelSearch", v.HotelSearch(db))

	x.POST("/booking/hotelDetails", v.HotelDetails(db))
	x.GET("/booking/hotelDetails", v.HotelDetails(db))

	x.POST("/booking/flightConfirm", v.FlightConfirmation(db))
	x.GET("/booking/flightConfirm", v.FlightConfirmation(db))

	x.POST("/booking/hotelConfirm", v.HotelConfirmation(db))
	x.GET("/booking/hotelConfirm", v.HotelConfirmation(db))

	x.POST("/booking/hotelPayment", v.HotelPayment(db))
	x.GET("/booking/hotelPayment", v.HotelPayment(db))

	x.Run(":8080")
}
