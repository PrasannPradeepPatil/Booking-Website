package models

type HotelSearchReq struct {
	City          string
	State         string
	Checkin       string
	Checkout      string
	Pricefilter   string
	Ratingfilter  string
	Minrating     string
	MinPriceRange string
	Maxpricerange string
}
