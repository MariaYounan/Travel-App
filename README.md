# Project Name
Travel App

# Scope
This is a web tool that allows you to get details about your trip.

# Before running any script
Please run `npm install` to include all libraries used in the project. Not uploaded with the code as it gives error "too many files"

# Testing
Tests are done using jest, There are test scripts for testing js functions and files using script `npm run test` 
  
There are 2 environments in this project you can run:

- Development
`npm run dev`

- Production
`npm run build`
`npm start` 
access the app using 'http://localhost:8001/' as it will be running on port 8001

Service Wworkers is installed and registered for offline access.

# How to use
Just fill in location you want to travel to, trip start date & end date then click on 'Get Trip Details' button. It will return all data you may need for your trip (City, Country, trip duration, in how many days your trip will start, weather at the entered time, more info about the country, its flag ... etc)
If you submit the form with empty field, an error will appear to fill in the form before submission.

# Responsive
All features are usable across modern desktop, tablet, and phone browsers.

# Extend Options / Ways to Stand Out
. End date is added and length of trip displayed.
. The REST Countries API is integrated to pull in data for the country being visited.










