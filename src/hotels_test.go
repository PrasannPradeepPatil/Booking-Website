package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	m "github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/stretchr/testify/assert"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var dbname string = "test.db"
var storename string = "testsecret"
var sessionname string = "testsession"
var CitySearch []m.CitySearchRes
var HotelSearch []m.HotelSearchRes
var HotelDetails []m.HotelDetailsRes

var router *gin.Engine

func setup_TestDb(dbName string) *gorm.DB {

	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	db.Migrator().DropTable(&m.CitySearchRes{})
	db.Migrator().DropTable(&m.HotelSearchRes{})

	db.AutoMigrate(&m.CitySearchReq{}, &m.HotelSearchRes{})

	return db
}

func init_Data(db *gorm.DB) {
	CitySearch = []m.CitySearchRes{
		{
			City:  "Gainesville",
			State: "Florida",
		},
		{
			City:  "Orlando",
			State: "Florida",
		},
		{
			City:  "Miami",
			State: "Florida",
		},
		{
			City:  "Baltimore",
			State: "Maryland",
		},
		{
			City:  "Atlanta",
			State: "Georgia",
		},
		{
			City:  "Tampa",
			State: "Florida",
		},
		{
			City:  "Los Angeles",
			State: "California",
		},
		{
			City:  "Seattle",
			State: "Washington",
		},
	}

	db.Create(&CitySearch)

	HotelSearch = []m.HotelSearchRes{
		{
			City:          "Gainesville",
			State:         "Florida",
			HotelName:     "Mariott",
			Rating:        "5.0",
			Standardprice: "200",
			ID:            "001",
		},
		{
			City:          "Gainesville",
			State:         "Florida",
			HotelName:     "Super 8",
			Rating:        "3.2",
			Standardprice: "60",
			ID:            "002",
		},
		{
			City:          "Orlando",
			State:         "Florida",
			HotelName:     "Super 8",
			Rating:        "4.1",
			Standardprice: "100",
			ID:            "003",
		},
		{
			City:          "Atlanta",
			State:         "Georgia",
			HotelName:     "Abc",
			Rating:        "3.5",
			Standardprice: "200",
			ID:            "004",
		},
		{
			City:          "Miami",
			State:         "Florida",
			HotelName:     "MMM",
			Rating:        "5.0",
			Standardprice: "300",
			ID:            "005",
		},
		{
			City:          "Los Angeles",
			State:         "California",
			HotelName:     "Fortune",
			Rating:        "5.0",
			Standardprice: "300",
			ID:            "006",
		},
		{
			City:          "Seattle",
			State:         "Washington",
			HotelName:     "Super 9",
			Rating:        "5.0",
			Standardprice: "400",
			ID:            "007",
		},
	}
	db.Create(&HotelSearch)

	HotelDetails = []m.HotelDetailsRes{
		{
			City:          "Gaineville",
			State:         "Florida",
			HotelName:     "Super 8",
			Rating:        "3.2",
			StandardPrice: "60",
			Address:       "abc, bcb",
			Amenities:     "pool, wifi, tv and AC",
		},
		{
			City:          "Atlanta",
			State:         "Georgia",
			HotelName:     "Abc",
			Rating:        "3.5",
			StandardPrice: "100",
			Address:       "abc, bcb",
			Amenities:     "pool, wifi, tv and AC",
		},
		{
			City:          "Miami",
			State:         "Florida",
			HotelName:     "MMM",
			Rating:        "4.1",
			StandardPrice: "150",
			Address:       "abc, bcb",
			Amenities:     "pool, wifi, tv and AC",
		},
		{
			City:          "Seattle",
			State:         "Washington",
			HotelName:     "Super 8",
			Rating:        "5.0",
			StandardPrice: "300",
			Address:       "abc, bcb",
			Amenities:     "pool, wifi, tv and AC",
		},
	}
	db.Create(&HotelDetails)
}

func Testmain(m *testing.M) {
	db := setup_TestDb(dbname)

	init_Data(db)
	router = setUpRouter(db)
	code := m.Run()

	os.Exit(code)
}

func TestSearchHotelsPassCase(t *testing.T) {
	HotelSearch := m.HotelSearchRes{
		City: "Gainesville",
	}
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/allhotels", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal(HotelSearch)
	res := strings.TrimLeft(w.Body.String(), "{\"data\":")
	res1 := strings.TrimRight(res, "}")
	assert.Equal(t, string(b), res1)

}

func TestSearchHotelPassCase(t *testing.T) {
	HotelSearch := m.HotelSearchRes{
		City: "Gainesville",
	}
	payload, _ := json.Marshal(HotelSearch)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	if nr.Code == 200 {
		HotelSearch := m.HotelSearchRes{
			City:          "Gainesville",
			State:         "Florida",
			HotelName:     "Super 8",
			Rating:        "3.2",
			Standardprice: "60",
			ID:            "002",
		}
		nr.Flush()
		body, _ := json.Marshal(HotelSearch)
		req, _ := http.NewRequest("POST", "/airportsearch", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func TesthotelSearchPassCase(t *testing.T) {
	HotelSearch := m.HotelSearchRes{
		City: "Miami",
	}
	payload, _ := json.Marshal(HotelSearch)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/l", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	if nr.Code == 200 {
		HotelSearch := m.HotelSearchRes{
			City:          "Miami",
			State:         "Florida",
			HotelName:     "MMM",
			Rating:        "5.0",
			Standardprice: "300",
			ID:            "005",
		}
		nr.Flush()
		body, _ := json.Marshal(HotelSearch)
		req, _ := http.NewRequest("PUT", "/foundairport", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func TestSerchhotelFailCase(t *testing.T) {
	HotelSearch := m.HotelSearchRes{
		City: "Miami",
	}
	payload, _ := json.Marshal(HotelSearch)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/l", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	if nr.Code == 200 {
		HotelSearch := m.HotelSearchRes{
			City:          "Miami",
			State:         "Florida",
			HotelName:     "MMM",
			Rating:        "5.0",
			Standardprice: "300",
			ID:            "005",
		}
		nr.Flush()
		w := httptest.NewRecorder()
		body, _ := json.Marshal(HotelSearch)
		req, _ := http.NewRequest("POST", "/createAnnouncement", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		router.ServeHTTP(w, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func TestHotelDetailsPassCase(t *testing.T) {
	HotelDetails := m.HotelDetailsRes{
		ID: "007",
	}
	payload, _ := json.Marshal(HotelDetails)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/l", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	if nr.Code == 200 {
		HotelDetails := m.HotelDetailsRes{
			City:          "Seattle",
			State:         "Washington",
			HotelName:     "Super 8",
			Rating:        "5.0",
			StandardPrice: "300",
			Address:       "abc, bcb",
			Amenities:     "pool, wifi, tv and AC",
		}
		nr.Flush()
		w := httptest.NewRecorder()
		body, _ := json.Marshal(HotelDetails)
		req, _ := http.NewRequest("POST", "/createAnnouncement", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		router.ServeHTTP(w, req)
		assert.Equal(t, 400, w.Code)
	}
}

func TestHotelDetailsFailCase(t *testing.T) {
	HotelDetails := m.HotelDetailsRes{
		ID: "009",
	}
	payload, _ := json.Marshal(HotelDetails)
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
