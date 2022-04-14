package views

import (
	"log"
	"net/http"
	"strings"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SearchFlights(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json []models.Search
		var req models.SearchReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("dest name : ", req.DestinationName)

		scity := ""
		dcity := ""
		var query string
		//condition checks ---------------------
		//roundtrip check
		if req.IsRoundTrip == "T" {
			query = "select flightnumber,departuretime,arrivaltime,sourceairport,destinationairport,rtprice as price,duration,id from searches where sourceairportcode = \"" + req.SourceName + "\" and destinationairportcode=\"" + req.DestinationName + "\""
		} else {
			query = "select flightnumber,departuretime,arrivaltime,sourceairport,destinationairport,price,duration,id from searches where sourceairportcode = \"" + req.SourceName + "\" and destinationairportcode=\"" + req.DestinationName + "\""
		}
		log.Println("Base Query after roundtrip filter:" + query)

		//airline filter
		if req.AirlineFilter != "" {
			query = query + " and airlineid = \"" + req.AirlineFilter + "\""
			log.Println("Query with Airline filter : " + query)
		}
		//ordering filters
		if req.ArrivalTimeFilter != "" || req.DepartureTimeFilter != "" || req.PriceRangeFilter != "" || req.JourneyTimeFilter != "" {
			query = query + " order by"
			//arrival time filter
			if req.ArrivalTimeFilter == "A" {
				query = query + " Arrivaltime,"
			} else if req.ArrivalTimeFilter == "D" {
				query = query + " Arrivaltime desc,"
			}
			log.Println("Query with arrival time filter : " + query)
			//departure time filter
			if req.DepartureTimeFilter == "A" {
				query = query + " departuretime,"
			} else if req.DepartureTimeFilter == "D" {
				query = query + " Departuretime desc,"
			}
			log.Println("Query with departure time filter : " + query)
			//price filter
			if req.PriceRangeFilter == "A" {
				query = query + " price,"
			} else if req.PriceRangeFilter == "D" {
				query = query + " price desc,"
			}
			log.Println("Query with price filter : " + query)
			//journey time filter
			if req.JourneyTimeFilter == "A" {
				query = query + " duration,"
			} else if req.JourneyTimeFilter == "D" {
				query = query + " duration desc,"
			}
			query = strings.TrimSuffix(query, ",")
			log.Println("Query with time filter : " + query)
		}
		log.Println("final Query after filters : " + query)

		rows, err := db.Raw(query).Rows()
		db.Raw("select cityname from srch_arpt where airportcode = ?", req.SourceName).Scan(&scity)
		db.Raw("select cityname from srch_arpt where airportcode = ?", req.DestinationName).Scan(&dcity)
		defer rows.Close()
		if err != nil {
			log.Println("err : ", err)
		}

		for rows.Next() {
			db.ScanRows(rows, &json)

		}

		for i := 0; i < len(json); i++ {
			json[i].Sourcecity = scity
			json[i].Destinationcity = dcity

		}

		log.Println(json)

		c.JSON(http.StatusOK, json)
	}

	return gin.HandlerFunc(fn)
}
