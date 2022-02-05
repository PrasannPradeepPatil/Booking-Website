package views

import (
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
	"gorm.io/gorm"
)

func SrchArptAPI(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.SrchArptAPI
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// strips HTML input from user for security purpose
		p := bluemonday.StripTagsPolicy()

		json.CityName = p.Sanitize(json.CityName)
		json.AirportCode = p.Sanitize(json.AirportCode)
		json.AirportName = p.Sanitize(json.AirportName)
		json.CountryName = p.Sanitize(json.CountryName)

		// create the announcement
		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"Result": "Airport Search API hit successfully!"})
	}

	return gin.HandlerFunc(fn)
}
