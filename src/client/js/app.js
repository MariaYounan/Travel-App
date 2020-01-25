"use strict"
function getTripDetails(){
    // APIs keys & Base URLs initialization
    const geoApiKey = 'MYounan2';
    const darkSkyApiKey = '840a1d63cc80e3ac72dc0dcf64094154';
    const pixabayApiKey = '14950546-d4fdbfc7f5133794d45b66532';
    const geoBaseURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
    const darkSkyBaseURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + darkSkyApiKey + '/';
    const pixabayBaseURL = 'https://pixabay.com/api/?key=' + pixabayApiKey + '&q=';
    
    
    let now = Math.ceil(new Date().getTime()/1000); //current date in epoch

    let city = document.getElementById('city').value;              //city
    let travelDateD = document.getElementById('startDate').value;  //start DATE
    let endDateD = document.getElementById('endDate').value;       //END DATE

    
    let travelDate = Math.ceil(new Date(travelDateD).getTime()/1000); //start date in epoch
    let endDate = Math.ceil(new Date(endDateD).getTime()/1000); //end date in epoch
    let tripDuration = Math.ceil((endDate - travelDate)/(24*60*60));
    let daysLeft = Math.ceil((travelDate - now)/(24*60*60));
    
    // If empty fields
    if (!city || !travelDate || !endDate){
        document.getElementById('temp').innerHTML = ' ';
        document.getElementById('pic').innerHTML = ' ';

        alert("Invalid Input, please enter city & Trip Dates");
    }else{
    // get data from 4 APIs
    let geoApi = geoBaseURL + city + '&maxRows=1&username=' + geoApiKey + '&style=full';
    const geoResponse = fetch(geoApi)
    .then(function(geoResponse){
        return geoResponse.json();
    })
    .then(function(geoData){
        let lat = geoData.geonames[0].lat;
        let lng = geoData.geonames[0].lng;
        let country = geoData.geonames[0].countryName;
        document.getElementById('trip').innerHTML= 'My trip to: ' + city + ', ' + country +  '</br>Departing: ' + travelDateD;
        document.getElementById('details').innerHTML= city + ', ' + country + ' is ' + daysLeft + ' days away</br> Trip Duration: ' + tripDuration + ' days';
        let darkSkyApi = darkSkyBaseURL + lat + ',' + lng + ',' + travelDate;
        const darkSkyResponse = fetch(darkSkyApi)
        .then(function(darkSkyResponse){
            return darkSkyResponse.json();
        })
        .then(function(darkSkyData){
            let tempH = darkSkyData.daily.data[0].temperatureHigh;
            let tempL = darkSkyData.daily.data[0].temperatureLow;
            let summary = darkSkyData.daily.data[0].summary;
            if(summary){
            document.getElementById('temp').innerHTML= 'Typical weather for then is:</br> High ' + tempH + ', Low ' + tempL + '</br>' + summary;
            }else{
                document.getElementById('temp').innerHTML= 'Typical weather for then is:</br> High ' + tempH + ', Low ' + tempL + '</br>';
            }
            let pixabayApi = pixabayBaseURL + city;
            const pixabayResponse = fetch(pixabayApi)
            .then(function(pixabayResponse){
                return pixabayResponse.json();
            }).then(function(pixabayData){
                let pic = pixabayData.hits[0].largeImageURL;
                let tags = pixabayData.hits[0].tags;
                document.getElementById('photo').innerHTML="<img id='locationImg'/>";
                document.getElementById('locationImg').setAttribute('src', pic);
                document.getElementById('locationImg').setAttribute('alt', tags);

                let restcountriesApi = 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true';
                const restcountriesResponse = fetch(restcountriesApi)
                .then(function(restcountriesResponse){
                    return restcountriesResponse.json();
                }).then(function(restcountriesData){
                    document.getElementById('extraInfo').innerHTML = '<div id="blockInfo">' + 'Calling Code: ' + restcountriesData[0].callingCodes[0]  + '<br>Capital: ' 
                    + restcountriesData[0].capital + '<br>Region: ' + restcountriesData[0].region + '<br>Population: ' + 
                    restcountriesData[0].population + '<br>TimeZone: ' + restcountriesData[0].timezones[0] + '<br>Currency: ' + restcountriesData[0].currencies[0].name 
                    + '<br>Language: ' + restcountriesData[0].languages[0].name + '<br><img id="flag" alt="flag" src="' + restcountriesData[0].flag + '"' + '</div>';
                })
            })

        })
    })
}
}

export { getTripDetails }






