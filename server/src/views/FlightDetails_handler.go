package views

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FlightDetails(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.FlightDetailsResp
		var req models.DetailsReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		scity, scode, dcity, dcode := "", "", "", ""
		db.Raw("select sourceairportcode from searches where id = ?", req.ID).Scan(&scode)
		db.Raw("select destinationairportcode from searches where id = ?", req.ID).Scan(&dcode)
		log.Println("scode: ", scode, " dcode : ", dcode)
		db.Raw("select cityname from srch_arpt where airportcode = ?", scode).Scan(&scity)
		db.Raw("select cityname from srch_arpt where airportcode = ?", dcode).Scan(&dcity)

		log.Println("ID : ", req.ID)

		db.Raw("select Sourceairport,Destinationairport,flightnumber,departuretime,arrivaltime,price,duration,flightname,Boardingtime,sourceairportcode,destinationairportcode,id from searches where ID = ?", req.ID).Scan(&res)
		res.Sourcecity = scity
		res.Destinationcity = dcity
		res.Departuretime = req.Startdate + res.Departuretime
		res.Boardingtime = req.Startdate + res.Boardingtime
		if strings.Contains(res.Arrivaltime, "(+1)") {

			t := req.Startdate
			date, err := time.Parse("2006-01-02", t)
			if err != nil {
				log.Println("err in string to date conversion: ", err)
			}
			date = date.AddDate(0, 0, 1)
			log.Println("incremented date : ", date)
			res.Arrivaltime = strings.Split(date.String(), " ")[0] + strings.Split(res.Arrivaltime, " ")[0]
		} else {
			res.Arrivaltime = req.Startdate + res.Arrivaltime
		}

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
