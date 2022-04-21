package views

import (
	"log"
	"net/http"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func PostLoginFlight(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res []models.PostLoginFlightRes
		var req models.PostLoginReq
		var resp models.PostLoginFRes

		userid := c.Request.Header["Userid"]
		token := c.Request.Header["Token"]
		log.Println("userid : ", userid[0], " token : ", token[0])

		var id = ""

		db.Raw("select userid from Userinfo where userid=? and Tempsessionkey = ?", userid[0], token[0]).Scan(&id)
		log.Println("rsult fdoem query : ", id)

		if id != "" {
			if err := c.ShouldBindJSON(&req); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			var mail = ""
			db.Raw("select EmailID from UserInfo where UserID = ?", req.UserID).Scan(&mail)

			log.Println("Login user mail ID : ", mail)
			rows, err := db.Raw("select Referencenumber,bookingdates,source,destination,id from Customerdata where emailAdd = ? and bookingtype = \"Flight\"", mail).Rows()

			if err != nil {
				log.Println("Error in getting customer info : ", err)
			}

			defer rows.Close()
			for rows.Next() {
				db.ScanRows(rows, &res)
			}

			for i := 0; i < len(res); i++ {
				db.Raw("select price from searches where id = ?", res[i].ID).Scan(&res[i].Price)
			}

			resp.Status = "success"
			// j, _ := json.Marshal(res)
			resp.Response = res

			c.JSON(http.StatusOK, resp)
		} else {
			resp.Status = "failure"
			c.JSON(http.StatusOK, resp)
		}
	}

	return gin.HandlerFunc(fn)
}
