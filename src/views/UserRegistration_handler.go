package views

import (
	b64 "encoding/base64"
	"log"
	"net/http"
	"strconv"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UserRegistration(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.RegistrationRes
		var req models.RegistrationReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var id int
		var cd int

		log.Println("Email request : ", req.EmailId)

		rows, err := db.Raw("select COUNT(*) from Userinfo where EmailId = ?", req.EmailId).Rows()

		log.Println("Existing test : ", cd)

		if err != nil {
			log.Println("error in query for register check")
		}

		for rows.Next() {
			err := rows.Scan(&cd)

			if err != nil {
				log.Println("error in query to get maxid")
			}
		}

		if cd > 0 {
			log.Println("Email already exists case")
			res.UserId = ""
			res.Status = "failure"
			res.Error = "Email Already exists"

		} else {

			rows, err := db.Raw("select max(userid) as id from Userinfo").Rows()

			if err != nil {
				log.Println("error in query to get maxid")
			}

			for rows.Next() {
				err := rows.Scan(&id)

				if err != nil {
					log.Println("error in query to get maxid")
				}
			}

			log.Println("id from db : ", id)

			id++

			encPass := b64.StdEncoding.EncodeToString([]byte(req.Password))
			log.Println("Encoded password : ", encPass)

			query := "insert into UserInfo(FirstName,LastName,EmailId,MobileNumber,Password,UserId,Tempsessionkey) values (?,?,?,?,?,?,?)"
			count := db.Exec(query, req.FirstName, req.LastName, req.EmailId, req.MobileNumber, encPass, id, "TempKey").RowsAffected

			log.Println("rows effected value : ", count)
			if count == 1 {
				res.UserId = strconv.Itoa(id)
				res.Status = "success"
				res.Error = ""
			} else {
				res.UserId = ""
				res.Status = "failure"
				res.Error = "Internal error. Failed to process request"
			}

		}

		c.JSON(http.StatusOK, res)

	}

	return gin.HandlerFunc(fn)
}
