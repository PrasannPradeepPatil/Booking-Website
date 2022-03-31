package models

type HotelSearchRes struct {
	City          string `gorm:"not_null" form:"City" json:"City"`
	State         string `gorm:"not_null" form:"State" json:"State"`
	HotelName     string `gorm:"not_null" form:"Hotelname" json:"Hotelname"`
	Rating        string `gorm:"not_null" form:"Rating" json:"Rating"`
	Standardprice string `gorm:"not_null" form:"Standardprice" json:"Standardprice"`
	ID            string `gorm:"not_null" form:"ID" json:"ID"`
}
