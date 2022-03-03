package models

type PayRes struct {
	Status    string `gorm:"not_null" form:"Status" json:"Status"`
	ErrorCode string `gorm:"not_null" form:"ErrorCode" json:"ErrorCode"`
}
