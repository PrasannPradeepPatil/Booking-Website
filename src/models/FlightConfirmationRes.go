package models

type FlightConfirmationRes struct {
	Emailstatus string `gorm:"not_null" form:"Emailstatus" json:"emailStatus"`
	Apistatus   string `gorm:"not_null" form:"Apistatus" json:"apiStatus"`
	Errorcode   string `gorm:"not_null" form:"Errorcode" json:"errorCode"`
	ReferenceNumber string `gorm:"not_null" form:"ReferenceNumber" json:"referenceNumber"`
}
