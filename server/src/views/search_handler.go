package views

import (
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

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
		// if req.IsRoundTrip == "T" {
		// 	query = "select flightnumber,flightname,departuretime,arrivaltime,sourceairport,sourceairportcode,destinationairport,destinationairportcode,rtprice as price,duration,id,sourcecity,destinationcity from searches where sourceairportcode = \"" + req.SourceName + "\" and destinationairportcode=\"" + req.DestinationName + "\""
		// } else {
		query = "select flightnumber,flightname,departuretime,arrivaltime,sourceairport,sourceairportcode,destinationairport,destinationairportcode,price,duration,id,sourcecity,destinationcity from searches where sourceairportcode = \"" + req.SourceName + "\" and destinationairportcode=\"" + req.DestinationName + "\""
		// }
		log.Println("Base Query after roundtrip filter:" + query)

		//airline filter
		if req.AirlineFilter != "" {
			query = query + " and airlineid = \"" + req.AirlineFilter + "\""
			log.Println("Query with Airline filter : " + query)
		}

		//Outbound time filter
		if req.StartTimeOutbound != "" || req.EndTimeOutbound != "" {
			log.Println("Inside time range filtering")
			//start time condition
			condtime1 := "T"
			if len(req.StartTimeOutbound) < 2 {
				condtime1 = condtime1 + "0" + req.StartTimeOutbound
			} else {
				condtime1 = condtime1 + req.StartTimeOutbound
			}
			condtime1 = condtime1 + ":00:00Z"
			log.Println("formated start time : " + condtime1)

			//end time condition
			condtime2 := "T"
			if len(req.EndTimeOutbound) < 2 {
				condtime2 = condtime2 + "0" + req.EndTimeOutbound
			} else {
				condtime2 = condtime2 + req.EndTimeOutbound
			}
			condtime2 = condtime2 + ":00:00Z"
			log.Println("formated start time : " + condtime2)
			//query updation
			query = query + " and departuretime >= \"" + condtime1 + "\" and departuretime < \"" + condtime2 + "\""
			log.Println("Query after time range filter : " + query)
		}

		//duration time limit filter
		if req.MaxDurationLimit != "" {

			log.Println("Query with max duration limit filter")
			maxlimit, err := strconv.Atoi(req.MaxDurationLimit)
			maxlimit = maxlimit * 60
			if err != nil {
				log.Println("Error converting limit to int")
			}
			query = query + " and duration <= " + strconv.Itoa(maxlimit)
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
			json[i].Departuretime = req.StartDate + json[i].Departuretime

			if strings.Contains(json[i].Arrivaltime, "(+1)") {
				log.Println("Inside date increment")
				t := req.StartDate

				date, err := time.Parse("2006-01-02", t)
				if err != nil {
					log.Println("err in string to date conversion: ", err)
				}
				date = date.AddDate(0, 0, 1)
				log.Println("incremented date : ", date)
				json[i].Arrivaltime = strings.Split(date.String(), " ")[0] + strings.Split(json[i].Arrivaltime, " ")[0]
			} else {
				json[i].Arrivaltime = req.StartDate + json[i].Arrivaltime
			}
			log.Println("arrival time : " + json[i].Arrivaltime)

			json[i].Sourcecity = scity
			json[i].Destinationcity = dcity

		}

		log.Println(json)

		c.JSON(http.StatusOK, json)
	}

	return gin.HandlerFunc(fn)
}
