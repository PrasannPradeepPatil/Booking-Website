package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	m "github.com/PrasannPradeepPatil/Booking-Website/src/models"
	v "github.com/PrasannPradeepPatil/Booking-Website/src/views"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var router *gin.Engine

func setupDB() *gorm.DB {

	db, err := gorm.Open(sqlite.Open("flights.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	return db

}

func SetupRouter(db *gorm.DB) *gin.Engine {

	fmt.Println("setup router started")

	x := gin.New()
	x.Use(gin.Recovery())

	x.POST("/booking/citySearch", v.SrchCity(db))

	x.POST("/booking/hotelSearch", v.HotelSearch(db))

	x.POST("/booking/hotelDetails", v.HotelDetails(db))

	x.POST("/booking/flightConfirm", v.FlightConfirmation(db))

	x.POST("/booking/hotelConfirm", v.HotelConfirmation(db))

	x.POST("/booking/hotelPayment", v.HotelPayment(db))

	fmt.Println("returning from setup router")

	return x

}

func TestMain(m *testing.M) {

	fmt.Println("main function test")

	db := setupDB()

	fmt.Println(db.Name())

	router = SetupRouter(db)

	fmt.Println("Running test functions")

	code := m.Run()

	os.Exit(code)

}

func TestSearchCityPass(t *testing.T) {

	fmt.Println("inside search city test Pass")

	w := httptest.NewRecorder()
	req := m.CitySearchReq{
		SrchStr: "F",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/citySearch", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "[{\"City\":\"Florida City\",\"State\":\"Florida\"},{\"City\":\"Fort Lauderdale\",\"State\":\"Florida\"}]", w.Body.String(), "Response should be as expected")

}

func TestSearchCityFail(t *testing.T) {

	fmt.Println("inside search city test Fail ")

	w := httptest.NewRecorder()
	req := m.CitySearchReq{
		SrchStr: "xamro",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/citySearch", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "\"No city data available for this search string\"", w.Body.String(), "No data response message should be returned")
}

func TestHotelSearchPass(t *testing.T) {

	fmt.Println("inside Hotel search API testcase: Pass ")

	w := httptest.NewRecorder()
	req := m.HotelSearchReq{
		City:         "Gainesville",
		State:        "Florida",
		Checkin:      "3/27/2022",
		Checkout:     "3/31/2022",
		Pricefilter:  "",
		Ratingfilter: "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelSearch", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "[{\"City\":\"Gainesville\",\"State\":\"Florida\",\"Hotelname\":\"Red Roof\",\"Rating\":\"3.9\",\"Standardprice\":\"\",\"ID\":\"001\"},{\"City\":\"Gainesville\",\"State\":\"Florida\",\"Hotelname\":\"Drury Inn \\u0026 Suites\",\"Rating\":\"4.8\",\"Standardprice\":\"\",\"ID\":\"002\"},{\"City\":\"Gainesville\",\"State\":\"Florida\",\"Hotelname\":\"Double Tree\",\"Rating\":\"4.1\",\"Standardprice\":\"\",\"ID\":\"003\"}]", w.Body.String(), "Resonse should be like expected")
}

func TestHotelSearchFail(t *testing.T) {

	fmt.Println("inside hotel search test Fail ")

	w := httptest.NewRecorder()
	req := m.HotelSearchReq{
		City:         "Gainesville",
		State:        "Utah",
		Checkin:      "3/27/2022",
		Checkout:     "3/31/2022",
		Pricefilter:  "",
		Ratingfilter: "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelSearch", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "\"No hotel data available for this city\"", w.Body.String(), "No data response message should be returned")
}
