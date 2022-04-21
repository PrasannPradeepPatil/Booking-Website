package models

type PostLoginHRes struct {
	Status   string              `gorm:"not_null" form:"Status" json:"status"`
	Response []PostLoginHotelRes `gorm:"not_null" form:"Response" json:"response"`
}
