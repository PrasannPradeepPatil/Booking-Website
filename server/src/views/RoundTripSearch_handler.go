package views

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RoundTripSearchFlights(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json1 []models.Search
		var json2 []models.Search
		var res []models.RoundTripSearchRes
		var req models.SearchReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("request for first trip : ", req)
		postBody, _ := json.Marshal(req)
		reqBody := bytes.NewBuffer(postBody)

		resp, err := http.Post("http://localhost:8080/booking/searchFlights", "application/json", reqBody)
		if err != nil {
			log.Println("An Error Occured calling email api ", err)
		}

		decoder := json.NewDecoder(resp.Body)
		decoder.Decode(&json1)
		log.Println("First response len: ", len(json1), " response : ", json1)

		src := req.SourceName
		req.SourceName = req.DestinationName
		req.DestinationName = src
		req.StartDate = req.EndDate
		log.Println("request for return trip : ", req)
		postBody, _ = json.Marshal(req)
		reqBody = bytes.NewBuffer(postBody)

		resp2, err := http.Post("http://localhost:8080/booking/searchFlights", "application/json", reqBody)
		if err != nil {
			log.Println("An Error Occured calling email api ", err)
		}

		decoder = json.NewDecoder(resp2.Body)
		decoder.Decode(&json2)
		log.Println("Second response len: ", len(json2), " response : ", json2)

		//Setting roundtrip response
		var index int
		index = 0
		res = make([]models.RoundTripSearchRes, len(json1)*len(json2))
		for i := 0; i < len(json1); i++ {
			for j := 0; j < len(json2); j++ {
				res[index].Arrivaltime = json1[i].Arrivaltime
				res[index].Departuretime = json1[i].Departuretime
				res[index].Destinationairport = json1[i].Destinationairport
				res[index].Destinationairportcode = json1[i].Destinationairportcode
				res[index].Destinationcity = json1[i].Destinationcity
				res[index].Duration = json1[i].Duration
				res[index].Flightname = json1[i].Flightname
				res[index].Flightnumber = json1[i].Flightnumber
				res[index].Id = json1[i].Id
				res[index].Price = json1[i].Price
				res[index].Sourceairport = json1[i].Sourceairport
				res[index].Sourceairportcode = json1[i].Sourceairportcode
				res[index].Sourcecity = json1[i].Sourcecity
				res[index].ReArrivaltime = json2[j].Arrivaltime
				res[index].ReDeparturetime = json2[j].Departuretime
				res[index].ReDestinationairport = json2[j].Destinationairport
				res[index].ReDestinationairportcode = json2[j].Destinationairportcode
				res[index].ReDestinationcity = json2[j].Destinationcity
				res[index].ReDuration = json2[j].Duration
				res[index].ReFlightname = json2[j].Flightname
				res[index].ReFlightnumber = json2[j].Flightnumber
				res[index].ReId = json2[j].Id
				res[index].RePrice = json2[j].Price
				res[index].ReSourceairport = json2[j].Sourceairport
				res[index].ReSourceairportcode = json2[j].Sourceairportcode
				res[index].ReSourcecity = json2[j].Sourcecity
				index++
			}

		}

		log.Println("Final response length: ", len(res), " response : ", res)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
