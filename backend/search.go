package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Sample text")
	requestHandler()
}

type srchReq struct {
	sourceName          string
	destinationName     string
	startDate           string
	endDate             string
	isRoundTrip         bool
	AirlineFilter       string
	ArrivalTimeFilter   string
	DepartureTimeFilter string
	PriceRangeFilter    string
	JourneyTimeFilter   string
}

type respData struct {
	Id                     string
	departureTime          string
	arrivalTime            string
	sourceAirportCode      string
	destinationAirportCode string
	price                  int
	duration               string
	flightName             string
	// flightLogo             image
}

func getData(w http.ResponseWriter, req *http.Request) {

	fmt.Println("req : ", req)
	image := ""
	fmt.Print(image)
	var requ srchReq
	// var res []respData
	err := json.NewDecoder(req.Body).Decode(&requ)
	fmt.Println("err ", err)
	fmt.Println("source : "+requ.sourceName+"to dest : "+requ.destinationName+"is round trip : ", requ.isRoundTrip)

	//query to get data from db
	/*connStr := "user=postgres dbname=connect-db password=secure-password host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Printf("\nSuccessfully connected to database!\n")
	querSql := "query for postgre data"
	err = db.QueryRow(querSql).Scan(&res.airportCode, &res.airportName, &res.cityName, &res.countryName)
	fmt.Println("response from db : " + res.airportCode)*/

	//var res respData
	res := respData{"1afd", "11:30 AM", "12:45 PM", "MCO", "GNV", 200, "1hr 15min", "American Airlines"}
	fmt.Println(res)
	w.WriteHeader(http.StatusOK)
	//w.Write(dat)
	// json.NewEncoder(w).Encode(dat)
	fmt.Fprint(w, res)

}

func homHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home page endpoint")
}

func requestHandler() {
	mux := http.NewServeMux()
	mux.HandleFunc("/search", getData)
	log.Fatal(http.ListenAndServe(":8000", mux))
}
