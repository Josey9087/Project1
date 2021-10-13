// var ticketmaster = "ma4xCtfbVX6HAL5AbR0JZjnhfwzzFMOy"
// var ticketmasterURL = 'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=1&postalCode=80228&apikey=${ticketmaster}'
// var sportsAPI = "cd6116b0-264b-11ec-b2e9-e52c4e87d97a"

// var seatGeek = "4a649bd858de54c13c57fa3341d39a5858fd79d148f3fec66b521dea9a881bd1"
// var seatGeekUrl = "https://api.seatgeek.com/2/events?geoid=80022&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0"
LastData()
$('#today').text("Today is: " + moment().format("MM/DD/YYYY"))
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
          Tickets: json.events[i].url,
          Type: json.events[i].type,
          Address: json.events[i].venue.address + " " + json.events[i].venue.extended_address,
          Time: moment(json.events[i].datetime_local).format("dddd, MMMM Do YYYY, h:mm:ss a"),
          Lat: json.events[i].venue.location.lat,
          Lon: json.events[i].venue.location.lon
        };
        localStorage.setItem("Event" + [i], JSON.stringify(Next))
        var AllOptions = JSON.parse(localStorage.getItem("Event" + [i]));
        console.log(AllOptions.Title)
        $('#Event-Cards').append(`
        <button data-key="${"Event" + [i]}"data-lat="${AllOptions.Lat}" data-lon="${AllOptions.Lon}" class="Pick column is-one-third">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">${AllOptions.Title}</div>
                      <div class="content">${AllOptions.Address}</div>
                      <div class="content">${AllOptions.Time}</div>
                      <a target="_blank" href="${AllOptions.Tickets}" class="content">Buy Tickets</a>
                    </div>
                  </div>
                </button>
                <hr>
                `)
      }
      $('.Pick').click(function (event) {
        var target = event.currentTarget
        console.log(target.getAttribute('data-lat'))
        Lat = target.getAttribute('data-lat')
        Lon = target.getAttribute('data-lon')
        Key = target.getAttribute('data-key')
        console.log(Lon)
        console.log(Lat)
        $('#modal').empty()
        for (var i = 0; i < localStorage.length; i++) {
          Key1 = localStorage.key([i]);
          console.log(Key1)
          if (Key == Key1) {
            localStorage.setItem('Chosen', localStorage.getItem(Key1))
            Chosen = JSON.parse(localStorage.getItem(Key1))
            console.log(Chosen.Title)
            $('#modal').append(`
            <div class="card">
                    <div class="card-content">
                      <div class="content">${Chosen.Title}</div>
                      <div class="content">${Chosen.Address}</div>
                      <div class="content">${Chosen.Time}</div>
                      <a target="_blank" href="${Chosen.Tickets}" class="content">Buy Tickets</a>
                    </div>
                  </div>
                  <hr>`)
            console.log(localStorage.getItem(Key1))
          }
        }
        $('#Event-Cards').empty()
        $.ajax({
          type: "GET",
          dataType: "json",
          url: 'https://api.foursquare.com/v2/venues/explore?client_id=IUF2O13MUPZXUU1ALLEXY1PO4XJG2RSIBVBZUJDTL1VIDIE1&client_secret=MDHH5GDE5ILC3JKCOQS14BGKCDZPQBZ1XO3Y2WVU3XYELWNL&ll=' + Lat + ',' + Lon + '&section=food&limit=6&v=20180323',
          data: {}
        })
          .done(function (data) {
            // Code for handling API response
            console.log(data);
            for (var i = 0; i < 6; i++) {
              var Food = {
                Name: data.response.groups[0].items[i].venue.name,
                Location: data.response.groups[0].items[i].venue.location.address
              }
              localStorage.setItem("Food" + [i], JSON.stringify(Food))
              var AllFood = JSON.parse(localStorage.getItem("Food" + [i]));
              console.log(AllFood.Name)
              $('#Event-Cards').append(`
        <button data-key="${"Food" + [i]}" class="Food column is-one-third">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">${AllFood.Name}</div>
                      <div class="content">${AllFood.Location}</div>
                    </div>
                  </div>
                </button>
                <hr>
                `)
            }
            $('.Food').click(function (event) {
              var target = event.currentTarget
              FoodKey = target.getAttribute('data-key')
              for (var i = 0; i < localStorage.length; i++) {
                FoodKey1 = localStorage.key([i]);
                console.log(Key1)
                if (FoodKey == FoodKey1) {
                  localStorage.setItem('ChosenFood', localStorage.getItem(FoodKey1))
                  ChosenFood = JSON.parse(localStorage.getItem(FoodKey1))
                  console.log(ChosenFood.Name)
                  $('#modal').append(`
                  <div class="card">
                          <div class="card-content">
                            <div class="content">${ChosenFood.Name}</div>
                            <div class="content">${ChosenFood.Location}</div>
                          </div>
                        </div>`)
            }}
            $('#Event-Cards').empty()})

//Beginning Modal for end display

          })
          .fail(function (jqXHR, textStatus, errorThrown) {


            // Code for handling errors
          });

        // var foursquareID = "IUF2O13MUPZXUU1ALLEXY1PO4XJG2RSIBVBZUJDTL1VIDIE1"
        // var foursquareKey = "MDHH5GDE5ILC3JKCOQS14BGKCDZPQBZ1XO3Y2WVU3XYELWNL"
      })
    })

    .fail(function (xhr, status, err) {
      console.log("error")
      // This time, we do not end up here!
    });
})


// modal
const Modal = $('.modal')
const ModalBg = $('.modal-background')

$('#Eventbtn').on("click", function () {
  Modal.addClass("is-active");
});

ModalBg.on("click", function () {
  Modal.removeClass("is-active");
});

//

function LastData() {
  $('#modal').empty()
  LastEvent = JSON.parse(localStorage.getItem('Chosen'))
  LastFood = JSON.parse(localStorage.getItem('ChosenFood'))
  $('#modal').append(`
  <div class="card">
  <div class="card-content">
    <div class="content">${LastEvent.Title}</div>
    <div class="content">${LastEvent.Address}</div>
    <div class="content">${LastEvent.Time}</div>
    <a target="_blank" href="${LastEvent.Tickets}" class="content">Buy Tickets</a>
  </div>
</div>
<hr>
  `)
  $('#modal').append(`
  <div class="card">
  <div class="card-content">
    <div class="content">${LastFood.Name}</div>
    <div class="content">${LastFood.Location}</div>
  </div>
</div>
  `)
}