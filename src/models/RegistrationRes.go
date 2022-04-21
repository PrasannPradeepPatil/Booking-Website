package models

type RegistrationRes struct {
	Status string `gorm:"not_null" form:"status" json:"status"`
	UserId string `gorm:"not_null" form:"UserId" json:"userId"`
	Error  string `gorm:"not_null" form:"Error" json:"error"`
}
