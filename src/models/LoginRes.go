package models

type LoginRes struct {
	LoginStatus string `gorm:"not_null" form:"LoginStatus" json:"loginStatus"`
	UserId     string `gorm:"not_null" form:"UserId" json:"userId"`
	Error      string `gorm:"not_null" form:"Error" json:"error"`
}
