# Booking Website

## Sprint 3

### Group Members:
#### Front End:
- Pranali Suhas Narkar
- Prasann Pradeep Patil
#### Backend:
- Manish Alluri
- Ahamad Shaik


### Sprint 3 overview

In the third sprint, we have modified the "Flights" pafe to handle certaing edge case and made beautification of the page.
We also started the "hotels" page.We implemented the hotel-search , hotel-listing and started with the hotels-filter components. 

 

User Stories Dashboard for Sprint 3: -
https://github.com/PrasannPradeepPatil/Booking-Website/projects/1?card_filter_query=label%3A%22sprint+3%22



### Completed Features: -
1. Hotels-search : We have implemented the hotel-search component with input fields like hotel location, start date and end date. The user will hit the seqarch button which will return a list of hotels at the input location and available within th input date range.

![Hotel-Search Component](/Images/flight-listing-filter.PNG)

2. Hotels-listing component: This component displays the list of the hotels that were returned by the backend based on the 
hotel-search inputs. The lists display the hotel image along with some hotel details returned by the backend.

![Hotel-Search Component](/Images/flight-listing-filter.PNG)

3. Hotel-filter component : We have started the implementation of hotel filter component. This component sends some filter details to the backend which will return the hotel lists satisfying the filter criteria.


### How to run the frontend application: -
npm install
-- This will install all the necessary node modules.

ng serve
This will start the webserver.

Backend API's: -

4. Search Button API call implementation to retrieve search results from the user which is the major API on the Homepage of the Flights section

5. Airport Search API that would be needed to check for the various airports based on the user input before the search button could be clicked.

6. Database setup and configuration with the APIs using gorm in GOlang to store and retrieve the results after a request is received by hitting the API.

7. Verifying the API request and response mechanisms by testing using Postman and hosting on a localserver using GOlang.

### How to run the backend application: -
go build
-- This will build all the existing go files in the src folder.

go run main.go
-- Sets up and hosts the APIs on a localhost server and also eshtablishes connection to the database.


### Demo video link
Demo - https://www.youtube.com/watch?v=iezFnKQA6Ts

