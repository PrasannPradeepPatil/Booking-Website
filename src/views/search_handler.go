package views

import (
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
	"gorm.io/gorm"
)

func SearchFlights(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.Search

		if err := c.ShouldBindJSON(&json); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		p := bluemonday.StripTagsPolicy()

		json.FlightNumber = p.Sanitize(json.FlightNumber)
		json.DepartureTime = p.Sanitize(json.DepartureTime)
		json.ArrivalTime = p.Sanitize(json.ArrivalTime)
		json.SourceAirport = p.Sanitize(json.SourceAirport)
		json.DestinationAirport = p.Sanitize(json.DestinationAirport)
		json.Price = p.Sanitize(json.Price)
		json.Duration = p.Sanitize(json.Duration)
		json.AirlineID = p.Sanitize(json.AirlineID)

		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"Result": "Flight search request API hit successfully!"})
	}

	return gin.HandlerFunc(fn)
}
