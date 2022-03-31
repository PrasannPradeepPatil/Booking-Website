package models

type HotelConfirmationRes struct {
	Emailstatus string `gorm:"not_null" form:"Emailstatus" json:"Emailstatus"`
	Apistatus   string `gorm:"not_null" form:"Apistatus" json:"Apistatus"`
	Errorcode   string `gorm:"not_null" form:"Errorcode" json:"Errorcode"`
}
