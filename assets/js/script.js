// var ticketmaster = "ma4xCtfbVX6HAL5AbR0JZjnhfwzzFMOy"
// var ticketmasterURL = 'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=1&postalCode=80228&apikey=${ticketmaster}'
// var sportsAPI = "cd6116b0-264b-11ec-b2e9-e52c4e87d97a"
// var seatGeek = "4a649bd858de54c13c57fa3341d39a5858fd79d148f3fec66b521dea9a881bd1"
var today = moment();
$('#today').text(today.format("dddd, MMMM Do YYYY, h:mm:ss a"));


var seatGeekUrl = "https://api.seatgeek.com/2/events?client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0"
var seatGeek = 
$("#search").on("click" , function(){
    var zipcode = $("#Zipput").val()
    console.log(zipcode)
})

$.ajax({
    type:"GET",
    url:'https://api.seatgeek.com/2/events?client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0',
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
        console.log("error")
                // This time, we do not end up here!
             }
  });