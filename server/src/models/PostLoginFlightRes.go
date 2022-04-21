package models

type PostLoginFlightRes struct {
	Referencenumber string `gorm:"not_null" form:"ReferenceNumber" json:"referenceNumber"`
	Bookingdates    string `gorm:"not_null" form:"BookingDates" json:"bookingDates"`
	Source          string `gorm:"not_null" form:"Source" json:"source"`
	Destination     string `gorm:"not_null" form:"Destination" json:"destination"`
	ID              string `gorm:"not_null" form:"ID" json:"id"`
	Price           string `gorm:"not_null" form:"Price" json:"price"`
}
