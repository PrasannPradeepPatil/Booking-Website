package views

import (
	"log"
	"net/http"

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
		db.Raw("select Sourceairport,Destinationairport,flightnumber,departuretime,arrivaltime,price,duration,flightname,Boardingtime,Checkinluggage,Cabin,Cancellation,sourceairportcode,destinationairportcode from searches where ID = ?", req.ID).Scan(&res)
		res.Sourcecity = scity
		res.Destinationcity = dcity

		log.Println("response value : ", res.Boardingtime+" "+res.Checkinluggage+" "+res.Cabin+" "+res.Cancellation+" "+res.Sourcecity+" "+res.Destinationcity)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
