package models

type PostLoginHotelRes struct {
	Referencenumber string `gorm:"not_null" form:"Referencenumber" json:"Referencenumber"`
	City            string `gorm:"not_null" form:"City" json:"city"`
	State           string `gorm:"not_null" form:"State" json:"state"`
	Hotelname       string `gorm:"not_null" form:"Hotelname" json:"hotelName"`
	Bookingdates    string `gorm:"not_null" form:"Bookingdates" json:"bookingdates"`
	Price           string `gorm:"not_null" form:"price" json:"price"`
	ID              string `gorm:"not_null" form:"ID" json:"id"`
}
