package models

type PostLoginFRes struct {
	Status   string               `gorm:"not_null" form:"Status" json:"status"`
	Response []PostLoginFlightRes `gorm:"not_null" form:"Response" json:"response"`
}
