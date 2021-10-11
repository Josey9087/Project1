// var ticketmaster = "ma4xCtfbVX6HAL5AbR0JZjnhfwzzFMOy"
// var ticketmasterURL = 'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=1&postalCode=80228&apikey=${ticketmaster}'
// var sportsAPI = "cd6116b0-264b-11ec-b2e9-e52c4e87d97a"

// var seatGeek = "4a649bd858de54c13c57fa3341d39a5858fd79d148f3fec66b521dea9a881bd1"
// var seatGeekUrl = "https://api.seatgeek.com/2/events?geoid=80022&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0"

$("#search").on("click", function () {
    var zipcode = $("#Zipput").val()
    console.log(zipcode)

    $.ajax({
        type: "GET",
        url: 'https://api.seatgeek.com/2/events?geoip=' + zipcode + '&per_page=6&listing_count.gt=0&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0',
        async: true,
        dataType: "json",
    })
        .done(function (json) {
            console.log(json);
            // Parse the response.
            // Do other things.
            $('#Event-Cards').empty()
            for (var i = 0; i < 6; i++) {
                var Next = {
                    Title: json.events[i].short_title,
                    AveragePrice: json.events[i].stats.average_price,
                    Type: json.events[i].type,
                    Address: json.events[i].venue.address + json.events[i].venue.extended_address,
                    Time: moment(json.events[i].datetime_local).format("dddd, MMMM Do YYYY, h:mm:ss a")
                };
                localStorage.setItem("Event" + i, JSON.stringify(Next))
                var AllOptions = JSON.parse(localStorage.getItem("Event" + [i]));
                console.log(AllOptions.Title)
                $('#Event-Cards').append(`
                <div class="column is-one-third">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">${AllOptions.Title}</div>
                      <div class="content">${AllOptions.Address}</div>
                      <div class="content">${AllOptions.Time}</div>
                      <div class="content">${"Price: $" + AllOptions.AveragePrice}</div>
                    </div>
                  </div>
                </div>
                <hr>
                `)
            }
        })

        .fail(function (xhr, status, err) {
            console.log("error")
            // This time, we do not end up here!
        });
})


// var foursquareID = "IUF2O13MUPZXUU1ALLEXY1PO4XJG2RSIBVBZUJDTL1VIDIE1"
// var foursquareKey = "MDHH5GDE5ILC3JKCOQS14BGKCDZPQBZ1XO3Y2WVU3XYELWNL"

$.ajax({
  dataType: "json",
  url: "https://api.foursquare.com/v2/venues/explore?client_id=IUF2O13MUPZXUU1ALLEXY1PO4XJG2RSIBVBZUJDTL1VIDIE1&client_secret=MDHH5GDE5ILC3JKCOQS14BGKCDZPQBZ1XO3Y2WVU3XYELWNL&near=DEN&v=20180323",
  data: {},
  success: function( data ) {
    // Code for handling API response
    console.log(data);
  },
  error: function(jqXHR, textStatus, errorThrown) {
    // Code for handling errors
  }
});