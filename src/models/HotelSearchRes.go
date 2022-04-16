package models

type HotelSearchRes struct {
	City          string `gorm:"not_null" form:"City" json:"city"`
	State         string `gorm:"not_null" form:"State" json:"state"`
	HotelName     string `gorm:"not_null" form:"Hotelname" json:"hotelName"`
	Rating        string `gorm:"not_null" form:"Rating" json:"rating"`
	Standardprice string `gorm:"not_null" form:"Standardprice" json:"standardPrice"`
	ID            string `gorm:"not_null" form:"ID" json:"id"`
}
