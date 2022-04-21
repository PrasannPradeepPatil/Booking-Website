package models

type SrchArptAPI struct {
	Cityname    string `gorm:"not_null" form:"cityName" json:"cityName"`
	Airportcode string `gorm:"not_null" form:"airportCode" json:"airportCode"`
	Airportname string `gorm:"not_null" form:"airportName" json:"airportName"`
	Countryname string `gorm:"not_null" form:"countryName" json:"countryName"`
}
