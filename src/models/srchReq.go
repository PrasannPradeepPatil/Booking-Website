package models

type SearchReq struct {
	SourceName          string
	DestinationName     string
	StartDate           string
	EndDate             string
	IsRoundTrip         string
	AirlineFilter       string
	ArrivalTimeFilter   string
	DepartureTimeFilter string
	PriceRangeFilter    string
	JourneyTimeFilter   string
}
