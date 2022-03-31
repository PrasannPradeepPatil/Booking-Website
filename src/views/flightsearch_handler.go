package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func priced(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.PriceRes
		var req models.PriceReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Println("ID : ", req.ID)
		db.Raw("select standardprice,flexibleprice from SamplePriceTable where ID = ?", req.ID).Scan(&res)

		log.Println("response value : ", res.FlexiblePrice)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
