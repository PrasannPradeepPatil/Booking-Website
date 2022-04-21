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

var dbName string = "flights.db"
var SrchArpt []m.SrchArptAPI
var Search []m.SearchRes
var FlightDetails []m.FlightDetailsResp

var router *gin.Engine

func setupTestDb(dbName string) *gorm.DB {

	db1, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	db1.Migrator().DropTable(&m.SrchArptAPI{})
	db1.Migrator().DropTable(&m.SearchRes{})

	db1.AutoMigrate(&m.SrchArptAPI{}, &m.SearchRes{})

	return db1
}

func setup_TestDB(db1 *gorm.DB) {
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

	db1.Create(&SrchArpt)

	Search = []m.SearchRes{
		{
			Flightname:         "American Airlines",
			Departuretime:      "13:00HRS",
			Arrivaltime:        "17:30HRS",
			Sourceairport:      "BWI",
			Destinationairport: "MIA",
			Price:              148,
			Duration:           270,
			Id:                 "AA B747",
			Sourcecity:         "Baltimore",
			Destinationcity:    "Miami",
		},
		{
			Flightname:         "Delta Airlines",
			Departuretime:      "11:00HRS",
			Arrivaltime:        "20:30HRS",
			Sourceairport:      "ORL",
			Destinationairport: "BWI",
			Price:              209,
			Duration:           570,
			Id:                 "DA B737",
			Sourcecity:         "Orlando",
			Destinationcity:    "Baltimore",
		},
		{
			Flightname:         "United Airlines",
			Departuretime:      "00:00HRS",
			Arrivaltime:        "7:30HRS",
			Sourceairport:      "ATL",
			Destinationairport: "MIA",
			Price:              89,
			Duration:           730,
			Id:                 "UA B747",
			Sourcecity:         "Atlanta",
			Destinationcity:    "Miami",
		},
	}
	db1.Create(&Search)

	FlightDetails = []m.FlightDetailsResp{
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
			Duration:               "270",
			Flightname:             "American Airlines",
			Boardingtime:           "12:30HRS",
		},
	}
	db1.Create(&FlightDetails)
}

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

	x.POST("/booking/SrchArptAPI", v.SrchArptAPI(db))

	x.POST("/booking/hotelSearch", v.HotelSearch(db))

	x.POST("/booking/hotelDetails", v.HotelDetails(db))

	x.POST("/booking/hotelConfirm", v.HotelConfirmation(db))

	x.POST("/booking/hotelPayment", v.HotelPayment(db))

	x.POST("/booking/searchRTFlights", v.RoundTripSearchFlights(db))

	x.POST("/booking/searchFlights", v.SearchFlights(db))

	x.POST("/booking/price", v.Price(db))

	x.POST("/booking/payment", v.Payment(db))

	x.POST("/booking/flightDetails", v.FlightDetails(db))

	x.POST("/booking/flightConfirm", v.FlightConfirmation(db))

	x.POST("/booking/email", v.Email(db))

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

func TestSampleTest(t *testing.T) {
	fmt.Println("sample test")
}

func TestSrchArptPass(t *testing.T) {
	w := httptest.NewRecorder()
	req := m.SrchArptReq{
		ArptSrchString: "M",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response is Ok")
}

func TestSearchAirportidPassCase(t *testing.T) {
	w := httptest.NewRecorder()
	req := m.SrchArptReq{
		ArptSrchString: "MCO",
	}

	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/SrchArptAPI", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body.String())
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
}

func TestSearchAirportbyCityPassCase(t *testing.T) {

	fmt.Println("Inside search airport test Pass")

	w := httptest.NewRecorder()
	req := m.SrchArptReq{
		ArptSrchString: "LOS",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/SrchArptAPI", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestSearchAirportFailCase(t *testing.T) {

	fmt.Println("Inside search airport test Fail")

	w := httptest.NewRecorder()
	req := m.SrchArptReq{
		ArptSrchString: "Z",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/SrchArptAPI", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestSrchReqPassCase(t *testing.T) {

	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:      "MCO",
		DestinationName: "MIA",
		StartDate:       "2022-04-05",
		EndDate:         "2022-04-25",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
}

func TestSrchReqOneWayPassCase(t *testing.T) {

	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:      "MCO",
		DestinationName: "MIA",
		StartDate:       "2022-04-05",
		EndDate:         "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
}

func TestSrchReqFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:      "MPO",
		DestinationName: "MIM",
		StartDate:       "2022-04-05",
		EndDate:         "2022-04-25",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestSrchReqNoDestFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:      "MPO",
		DestinationName: "",
		StartDate:       "2022-04-05",
		EndDate:         "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightPricePassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.PriceReq{
		ID: "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/price", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightPriceFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.PriceReq{
		ID: "050",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/price", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightPriceNoIDFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.PriceReq{
		ID: "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/price", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightPaymentPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.PayReq{
		CustomerName: "Manish",
		MobileNumber: "6672281801",
		EmailAdd:     "abc@gmail.com",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/payment", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightPaymentFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.PayReq{
		CustomerName: "null",
		MobileNumber: "4756",
		EmailAdd:     "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/payment", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
}

func TestFlightDetailsPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.DetailsReq{
		ID:        "003",
		Startdate: "2022-04-25",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/flightDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightDetailsbyIDPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.DetailsReq{
		ID:        "0034",
		Startdate: "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/flightDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightDetailsFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.DetailsReq{
		ID:        "0",
		Startdate: "2022",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/flightDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightConfirmationPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.FlightConfirmationReq{
		CodeStatus:   "success",
		BookingDates: "2022-04-17",
		CustomerName: "Manish",
		EmailAdd:     "manish@gmail.com",
		MobileNumber: "646992828",
		Source:       "LAX",
		Destination:  "MCO",
		ID:           "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/flightConfirm", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestFlightConfirmationFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.FlightConfirmationReq{
		CodeStatus:   "failure",
		BookingDates: "2022-04-17",
		CustomerName: "Manish",
		EmailAdd:     "",
		MobileNumber: "646992828",
		Source:       "LAX",
		Destination:  "MCO",
		ID:           "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/flightConfirm", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestEmailFOTPPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.EmailReq{
		EmailAdd:        "azlee1281@gmail.com",
		CustomerName:    "AZ Lee",
		MailType:        "FOTP",
		Source:          "MIAMI",
		Destination:     "LOS ANGELES",
		BookingCity:     "Miami",
		DateOfBooking:   "2022-28-03",
		ReferenceNumber: "2H44oH45B",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/email", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestEmailHOTPPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.EmailReq{
		EmailAdd:        "azlee1281@gmail.com",
		CustomerName:    "AZ Lee",
		MailType:        "HOTP",
		Source:          "MIAMI",
		Destination:     "LOS ANGELES",
		BookingCity:     "Miami",
		DateOfBooking:   "2022-28-03",
		ReferenceNumber: "2H44oH45B",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/email", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestEmailFCONFPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.EmailReq{
		EmailAdd:        "azlee1281@gmail.com",
		CustomerName:    "AZ Lee",
		MailType:        "FCONF",
		Source:          "MIAMI",
		Destination:     "LOS ANGELES",
		BookingCity:     "Miami",
		DateOfBooking:   "2022-28-03",
		ReferenceNumber: "2H44oH45B",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/email", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestEmailHCONFPassCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.EmailReq{
		EmailAdd:        "azlee1281@gmail.com",
		CustomerName:    "AZ Lee",
		MailType:        "FCONF",
		Source:          "MIAMI",
		Destination:     "LOS ANGELES",
		BookingCity:     "Miami",
		DateOfBooking:   "2022-28-03",
		ReferenceNumber: "2H44oH45B",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/email", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestEmailFailCase(t *testing.T) {
	fmt.Println("Inside search request test pass")
	w := httptest.NewRecorder()
	req := m.EmailReq{
		EmailAdd:        "",
		CustomerName:    "AZ Lee",
		MailType:        "FCONF",
		Source:          "MIAMI",
		Destination:     "LOS ANGELES",
		BookingCity:     "Miami",
		DateOfBooking:   "2022-28-03",
		ReferenceNumber: "2H44oH45B",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/email", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req1)
	fmt.Print("Res body: ", w.Body)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")

}

func TestCitySearchPass(t *testing.T) {
	fmt.Println("Inside search city pass")
	w := httptest.NewRecorder()
	req := m.CitySearchReq{
		SrchStr: "G",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/citySearch", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "[{\"city\":\"Gainesville\",\"state\":\"Florida\"}]", w.Body.String(), "Response should be as expected")
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
	assert.Equal(t, "null", w.Body.String(), "No data response message should be returned")
}

func TestHotelSearchPass(t *testing.T) {

	fmt.Println("inside Hotel search API testcase: Pass ")

	w := httptest.NewRecorder()
	req := m.HotelSearchReq{
		City:         "Miami",
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
	assert.Equal(t, "[{\"city\":\"Miami\",\"state\":\"Florida\",\"hotelName\":\"Eurostars Langford\",\"rating\":\"4.2\",\"standardPrice\":\"181\",\"id\":\"005\"},{\"city\":\"Miami\",\"state\":\"Florida\",\"hotelName\":\"Urbanica Fifth Hotel\",\"rating\":\"4.7\",\"standardPrice\":\"154\",\"id\":\"004\"},{\"city\":\"Miami\",\"state\":\"Florida\",\"hotelName\":\"Hilton Miami Downtown\",\"rating\":\"4.4\",\"standardPrice\":\"208\",\"id\":\"006\"}]", w.Body.String(), "Resonse should be like expected")
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
	assert.Equal(t, "null", w.Body.String(), "No data response message should be returned")
}

func TestHotelDetailsPass(t *testing.T) {

	fmt.Println("inside Hotel details API testcase: Pass ")

	w := httptest.NewRecorder()
	req := m.DetailsReq{
		ID: "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "{\"city\":\"Gainesville\",\"state\":\"Florida\",\"hotelName\":\"Red Roof\",\"rating\":\"3.9\",\"standardPrice\":\"\",\"address\":\"3500 SW 42nd St, Gainesville, FL 32608\",\"amenities\":\"Wifi, Swimming Pool, Parking, AC\",\"id\":\"\"}", w.Body.String(), "Response should be like expected")
}

func TestHotelDetailsFail(t *testing.T) {

	fmt.Println("inside hotel details test Fail ")

	w := httptest.NewRecorder()
	req := m.DetailsReq{
		ID: "125478",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelDetails", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "{\"city\":\"\",\"state\":\"\",\"hotelName\":\"\",\"rating\":\"\",\"standardPrice\":\"\",\"address\":\"\",\"amenities\":\"\",\"id\":\"\"}", w.Body.String(), "No data response message should be returned")
}

func TestHotelPaymentPass(t *testing.T) {

	fmt.Println("inside Hotel payment API testcase: Pass ")

	w := httptest.NewRecorder()
	req := m.HotelPayReq{
		CustomerName: "Ahamad Shaik",
		MobileNumber: "3527093318",
		EmailAdd:     "ahamadshaik333@gmail.com",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelPayment", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	// assert.Equal(t, "{\"City\":\"Gainesville\",\"State\":\"Florida\",\"Hotelname\":\"Red Roof\",\"Rating\":\"3.9\",\"Standardprice\":\"83\",\"Address\":\"3500 SW 42nd St, Gainesville, FL 32608\",\"Amenities\":\"Wifi, Swimming Pool, Parking, AC\",\"ID\":\"001\"}", w.Body.String(), "Response should be like expected")
}

func TestHotelPaymentFail(t *testing.T) {

	fmt.Println("inside hotel payment test Fail ")

	w := httptest.NewRecorder()
	req := m.HotelPayReq{
		CustomerName: "Ahamad Shaik",
		MobileNumber: "3527093318",
		EmailAdd:     "257896548",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelPayment", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "{\"status\":\"failure\",\"otpCode\":\"\",\"errorCode\":\"\"}", w.Body.String(), "failure status should be returned")
}

func TestHotelConfPass(t *testing.T) {

	fmt.Println("inside Hotel payment API testcase: Pass ")

	w := httptest.NewRecorder()
	req := m.HotelConfirmationReq{
		CodeStatus:   "Success",
		BookingDates: "3/28/2022 - 3/31/2022",
		CustomerName: "Ahamad Shaik",
		EmailAdd:     "ahamadshaik333@gmail.com",
		MobileNumber: "3527093318",
		HotelName:    "Drury Inn",
		City:         "Gainesville",
		State:        "Florida",
		ID:           "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelConfirm", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	assert.Equal(t, "{\"emailStatus\":\"success\",\"apiStatus\":\"success\",\"errorCode\":\"\"}", w.Body.String(), "Response should be like expected")
}

func TestHotelConfFail(t *testing.T) {

	fmt.Println("inside hotel payment test Fail ")

	w := httptest.NewRecorder()
	req := m.HotelConfirmationReq{
		CodeStatus:   "Success",
		BookingDates: "3/28/2022 - 3/31/2022",
		CustomerName: "Ahamad Shaik",
		EmailAdd:     "",
		MobileNumber: "3527093318",
		HotelName:    "Drury Inn",
		City:         "Gainesville",
		State:        "Florida",
		ID:           "001",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/hotelConfirm", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected Response status is OK")
	// assert.Equal(t, "{\"Status\":\"failure\",\"OtpCode\":\"\",\"ErrorCode\":\"\"}", w.Body.String(), "failure status should be returned")
}

func TestRoundTripSearchPass(t *testing.T) {
	fmt.Println("Inside round trip search pass case")

	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:          "LAX",
		DestinationName:     "SAN",
		StartDate:           "2022-04-05",
		EndDate:             "2022-04-25",
		IsRoundTrip:         "T",
		AirlineFilter:       "",
		ArrivalTimeFilter:   "",
		DepartureTimeFilter: "",
		PriceRangeFilter:    "",
		JourneyTimeFilter:   "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchRTFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected response Status is OK")
	assert.Equal(t, "[{\"flightNumber\":\"AA105\",\"reFlightNumber\":\"UA646\",\"flightName\":\"American Airlines\",\"reFlightName\":\"United Airlines\",\"departureTime\":\"2022-04-05T08:00:00Z\",\"reDepartureTime\":\"2022-04-25T13:30:30Z\",\"arrivalTime\":\"2022-04-05T11:15:00Z\",\"reArrivalTime\":\"2022-04-26T11:15:00Z\",\"sourceAirport\":\"LOS ANGELES INTERNATIONAL AIRPORT\",\"reSourceAirport\":\"SAN DIEGO INTERNATIONAL AIRPORT\",\"sourceAirportCode\":\"LAX\",\"reSourceAirportCode\":\"SAN\",\"destinationAirportCode\":\"SAN\",\"reDestinationAirportCode\":\"LAX\",\"destinationAirport\":\"SAN DIEGO INTERNATIONAL AIRPORT\",\"reDestinationAirport\":\"LOS ANGELES INTERNATIONAL AIRPORT\",\"price\":142,\"rePrice\":134,\"duration\":195,\"reDuration\":180,\"id\":\"002\",\"reId\":\"032\",\"sourceCity\":\"LOS ANGELES\",\"reSourceCity\":\"SAN DIEGO\",\"destinationCity\":\"SAN DIEGO\",\"reDestinationCity\":\"LOS ANGELES\"}]", w.Body.String(), "Response should be as expected")
}

func TestRoundTripSearchfail(t *testing.T) {
	fmt.Println("Inside round trip search fail case")

	w := httptest.NewRecorder()
	req := m.SearchReq{
		SourceName:          "MCM",
		DestinationName:     "SAN",
		StartDate:           "2022-04-05",
		EndDate:             "2022-04-25",
		IsRoundTrip:         "T",
		AirlineFilter:       "",
		ArrivalTimeFilter:   "",
		DepartureTimeFilter: "",
		PriceRangeFilter:    "",
		JourneyTimeFilter:   "",
	}
	payload, _ := json.Marshal(req)
	req1, _ := http.NewRequest("POST", "/booking/searchRTFlights", strings.NewReader(string(payload)))
	req1.Header.Set("Content-type", "application/json")
	router.ServeHTTP(w, req1)
	assert.Equal(t, 200, w.Code, "Expected response Status is OK")
	assert.Equal(t, "[]", w.Body.String(), "Response should be blank ")

}
