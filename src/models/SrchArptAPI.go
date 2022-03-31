package models

type SrchArptAPI struct {
	Cityname    string `gorm:"not_null" form:"cityName" json:"cityname"`
	Airportcode string `gorm:"not_null" form:"airportCode" json:"airportcode"`
	Airportname string `gorm:"not_null" form:"airportName" json:"airportname"`
	Countryname string `gorm:"not_null" form:"countryName" json:"countryname"`
}
