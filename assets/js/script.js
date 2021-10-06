var ticketmaster = "ma4xCtfbVX6HAL5AbR0JZjnhfwzzFMOy"
var ticketmasterURL = 'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=1&postalCode=80228&apikey=${ticketmaster}'
$("#search").on("click" , function(){
    var zipcode = $("#Zipput").val()
    console.log(zipcode)
})

$.ajax({
    type:"GET",
    url:'https://app.ticketmaster.com/discovery/v2/events.json?${ticketmaster}',
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