package models

type FlightDetailsRes struct {
	Boardingtime   string `gorm:"not_null" form:"Boardingtime" json:"Boardingtime"`
	Checkinluggage string `gorm:"not_null" form:"Checkinluggage" json:"Checkinluggage"`
	Cabin          string `gorm:"not_null" form:"Cabin" json:"Cabin"`
	Cancellation   string `gorm:"not_null" form:"Cancellation" json:"Cancellation"`
}
