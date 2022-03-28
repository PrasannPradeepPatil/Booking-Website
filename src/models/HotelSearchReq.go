package models

type HotelSearchReq struct {
	City         string
	State        string
	Checkin      string
	Checkout     string
	Pricefilter  string
	Ratingfilter string
}
