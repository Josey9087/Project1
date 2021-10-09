
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
                console.log(short_title)
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
        console.log("error")
                // This time, we do not end up here!
             }
  });