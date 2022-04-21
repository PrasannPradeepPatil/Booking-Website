package views

import (
	b64 "encoding/base64"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/PrasannPradeepPatil/Booking-Website/src/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Login(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var res models.LoginRes
		var req models.LoginReq

		if err := c.ShouldBindJSON(&req); err != nil {

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		encPass := b64.StdEncoding.EncodeToString([]byte(req.Password))
		log.Println("Encoded password : ", encPass)

		log.Println("ID : ", req.EmailID)
		db.Raw("select userid from UserInfo where EmailID = ? and password = ?", req.EmailID, encPass).Scan(&res)

		key := b64.StdEncoding.EncodeToString([]byte(req.EmailID + req.Password))
		log.Println("Byte key is : ", key)

		var tempkey = ""
		if len(key) > 8 {
			tempkey = key[0:3] + key[len(key)-3:]
			log.Println(tempkey)
		}

		now := time.Now()
		tempkey = tempkey + strconv.Itoa(int(now.UnixNano()))
		log.Println("Final temp key : ", tempkey)

		if res.UserId != "" {
			sqlQuery := "update UserInfo set TempsessionKey = $1 where userid = $2"
			res := db.Exec(sqlQuery, tempkey, res.UserId)
			log.Println("Rows updated : ", res)
		}

		if res.UserId != "" {
			res.LoginStatus = "success"
			res.Error = ""
			res.Token = tempkey
		} else {
			res.LoginStatus = "failure"
			res.Error = "Username and Password Mismatch! Please try again"
		}

		log.Println("response value : ", res.LoginStatus+" "+res.UserId+" "+res.Error)

		c.JSON(http.StatusOK, res)
	}

	return gin.HandlerFunc(fn)
}
