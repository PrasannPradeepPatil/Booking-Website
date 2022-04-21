package models

type PriceRes struct {
	StandardPrice string `gorm:"not_null" form:"StandardPrice" json:"standardPrice"`
	FlexiblePrice string `gorm:"not_null" form:"FlexiblePrice" json:"flexiblePrice"`
}
