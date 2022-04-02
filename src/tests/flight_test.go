package main

import (
	"encoding/json"
	m "github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var dbName string = "test.db"
var storeName string = "testsecret"
var sessionName string = "testsession"
var SrchArpt []m.SrchArptAPI
var search []m.search
var FlightDetails []m.FlightDetails
var router *gin.Engine

func setupTestDb(dbName string) *gorm.DB {

	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	db.Migrator().DropTable(&m.SrchArptAPI{})
	db.Migrator().DropTable(&m.search{})

	db.AutoMigrate(&m.SrchArptAPI{}, &m.search{})

	return db
}

func initData(db *gorm.DB) {
	SrchArpt = []m.SrchArptAPI{
		{
			Cityname:    "Gainesville",
			Airportcode: "GNV",
			Airportname: "Gainesville Regional Airport",
			Countryname: "USA",
		},
		{
			Cityname:    "Orlando",
			Airportcode: "MCO",
			Airportname: "Orlando International Airport",
			Countryname: "USA",
		},
		{
			Cityname:    "Baltimore",
			Airportcode: "BWI",
			Airportname: "Baltimore/Washington International Thurgood Marshall Airport",
			Countryname: "USA",
		},
		{
			Cityname:    "Atanta",
			Airportcode: "ATL",
			Airportname: "Hartsfield Jackson Atlanta International Airport",
			Countryname: "USA",
		},
		{
			Cityname:    "Miami",
			Airportcode: "MIA",
			Airportname: "Miami International Airport",
			Countryname: "USA",
		},
	}

	db.Create(&SrchArpt)

	search = []m.search{
		{
			Flightname:         "American Airlines",
			Departuretime:      "13:00HRS",
			Arrivaltime:        "17:30HRS",
			Sourceairport:      "BWI",
			Destinationairport: "MIA",
			Price:              "148",
			Duration:           "4:30HRS",
			Airlineid:          "AA B747",
			Sourcecity:         "Baltimore",
			Destinationcity:    "Miami",
		},
		{
			Flightname:         "Delta Airlines",
			Departuretime:      "11:00HRS",
			Arrivaltime:        "20:30HRS",
			Sourceairport:      "ORL",
			Destinationairport: "BWI",
			Price:              "209",
			Duration:           "9:30HRS",
			Airlineid:          "DA B737",
			Sourcecity:         "Orlando",
			Destinationcity:    "Baltimore",
		},
		{
			Flightname:         "United Airlines",
			Departuretime:      "00:00HRS",
			Arrivaltime:        "7:30HRS",
			Sourceairport:      "ATL",
			Destinationairport: "MIA",
			Price:              "89",
			Duration:           "7:30HRS",
			Airlineid:          "UA B747",
			Sourcecity:         "Atlanta",
			Destinationcity:    "Miami",
		},
	}
	db.Create(&search)

	FlightDetails = []m.FlightDetails{
		{
			Sourceairport:          "Baltimore/Washington International Thurgood Marshall Airport",
			Destinationairport:     "Miami International Airport",
			Sourcecity:             "Baltimore",
			Destinationcity:        "Miami",
			Sourceairportcode:      "BWI",
			Destinationairportcode: "MIA",
			Flightnumber:           "001",
			Departuretime:          "13:00HRS",
			Arrivaltime:            "17:30HRS",
			Price:                  "148",
			Duration:               "4:30HRS",
			Flightname:             "American Airlines",
			Boardingtime:           "12:30HRS",
			Checkinluggage:         "50LBS",
			Cancellation:           "Non-refundable",
		},
	}
	db.Create(&FlightDetails)
}

func TestMain(m *testing.M) {
	db := setupTestDb(dbName)

	initData(db)

	router = SetupRouter(db, storeName, sessionName)

	code := m.Run()

	os.Exit(code)
}

func SearchAirportReqPassCase(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/allairports", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal(SrchArpt)
	res := strings.TrimLeft(w.Body.String(), "{\"data\":")
	res1 := strings.TrimRight(res, "}")
	assert.Equal(t, string(b), res1)

}

func SearchAirportResPassCase(t *testing.T) {
	searcharpt := m.SrchArpt{
		Airportname: "BWI",
	}
	payload, _ := json.Marshal(searcharpt)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	if nr.Code == 200 {
		SrchArpt := m.SrchArptAPI{
			Cityname:    "Baltimore",
			Airportcode: "BWI",
			Airportname: "Baltimore/Washington International Thurgood Marshall Airport",
			Countryname: "USA",
		}
		nr.Flush()
		body, _ := json.Marshal(SrchArpt)
		req, _ := http.NewRequest("POST", "/airportsearch", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func SearchAirportRePassCase(t *testing.T) {
	searcharpt := m.SrchArpt{
		Airportname: "MIA",
	}
	payload, _ := json.Marshal(searcharpt)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/l", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	if nr.Code == 200 {
		SrchArpt := m.SrchArptAPI{
			Cityname:    "Miami",
			Airportcode: "MIA",
			Airportname: "Miami International Airport",
			Countryname: "USA",
		}
		nr.Flush()
		body, _ := json.Marshal(SrchArpt)
		req, _ := http.NewRequest("PUT", "/foundairport", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func SrchArptFailCase(t *testing.T) {
	searcharpt := m.SrchArpt{
		Airportname: "IAD",
	}
	payload, _ := json.Marshal(searcharpt)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/l", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	if nr.Code == 200 {
		SrchArpt := m.SrchArptAPI{
			Cityname:    "Miami",
			Airportcode: "MIA",
			Airportname: "Miami International Airport",
			Countryname: "USA",
		}
		nr.Flush()
		w := httptest.NewRecorder()
		body, _ := json.Marshal(SrchArpt)
		req, _ := http.NewRequest("POST", "/createAnnouncement", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		router.ServeHTTP(w, req)
		assert.Equal(t, 400, w.Code)
	}
}

func FlightDetailsFailCase(t *testing.T) {
	FlightDetails := m.FlightDetails{
		FlightNumber: "003",
	}
	payload, _ := json.Marshal(FlightDetails)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/FlightDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	if nr.Code == 200 {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/notFound/-1", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(w, req)
		assert.Equal(t, 404, w.Code)

	}
}
