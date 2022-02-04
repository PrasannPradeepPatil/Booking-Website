package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.co
	m/mattn/go-sqlite3"
)

func main() {
	fmt.Println("Sample text")
	requestHandler()
}

type airportSearch struct {
	ArptSrchString string
}

type respData struct {
	cityName    string
	airportCode string
	airportName string
	countryName string
}

func getData(w http.ResponseWriter, req *http.Request) {

	fmt.Println("req : ", req)
	var art airportSearch
	// var res respData
	err := json.NewDecoder(req.Body).Decode(&art)
	fmt.Println("err ", err)
	fmt.Println("request data : " + art.ArptSrchString)

	//query to get data from db sqllite
	db, err := sql.Open("sqllite3", "./test.db")

	rows, err := db.Query("query to get data")

	var airportCode string

	for rows.Next() {

		err = rows.Scan(&airportCode)
		fmt.Println("output respcode ", airportCode)

	}
	
	// res = respData{"Florida", "GNV", "Gainesville Regional Airport", "USA"}
	// fmt.Println("response test : " + res.airportCode)

	res := respData{cityName: "Florida", airportCode: "GNV", airportName: "Gainesville Regional Airport", countryName: "USA"}
	fmt.Println(res)
	w.WriteHeader(http.StatusOK)

	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("response : ", res)
	fmt.Fprint(w, res)

	// json.NewEncoder(w).Encode(re)

}

func homHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home page endpoint")
}

func requestHandler() {
	mux := http.NewServeMux()
	mux.HandleFunc("/searchAirport", getData)
	log.Fatal(http.ListenAndServe(":8000", mux))
}
