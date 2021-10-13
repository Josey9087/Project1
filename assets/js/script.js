// var seatGeek = "4a649bd858de54c13c57fa3341d39a5858fd79d148f3fec66b521dea9a881bd1"
// var seatGeekUrl = "https://api.seatgeek.com/2/events?geoid=80022&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0"

LastData()

$('#today').text("Today is: " + moment().format("MM/DD/YYYY"))

$("#search").on("click", function () {
  var zipcode = $("#Zipput").val()
  $.ajax({
    type: "GET",
    url: 'https://api.seatgeek.com/2/events?geoip=' + zipcode + '&per_page=6&listing_count.gt=0&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0',
    async: true,
    dataType: "json",
  })
    .done(function (json) {
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
        Lat = target.getAttribute('data-lat')
        Lon = target.getAttribute('data-lon')
        Key = target.getAttribute('data-key')
        $('#modal').empty()
        for (var i = 0; i < localStorage.length; i++) {
          Key1 = localStorage.key([i]);
          if (Key == Key1) {
            localStorage.setItem('Chosen', localStorage.getItem(Key1))
            Chosen = JSON.parse(localStorage.getItem(Key1))
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
            break
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
            for (var i = 0; i < 6; i++) {
              var Food = {
                Name: data.response.groups[0].items[i].venue.name,
                Location: data.response.groups[0].items[i].venue.location.address,
                Category: data.response.groups[0].items[i].venue.categories[0].shortName
              }
              localStorage.setItem("Food" + [i], JSON.stringify(Food))
              var AllFood = JSON.parse(localStorage.getItem("Food" + [i]));
              $('#Event-Cards').append(`
        <button data-key="${"Food" + [i]}" class="Food column is-one-third">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">${AllFood.Name}</div>
                      <div class="content">${AllFood.Location}</div>
                      <div class="content">${AllFood.Category}</div>
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
                if (FoodKey == FoodKey1) {
                  localStorage.setItem('ChosenFood', localStorage.getItem(FoodKey1))
                  ChosenFood = JSON.parse(localStorage.getItem(FoodKey1))
                  $('#modal').append(`
                  <div class="card">
                          <div class="card-content">
                            <div class="content">${ChosenFood.Name}</div>
                            <div class="content">${ChosenFood.Location}</div>
                            <div class="content">${ChosenFood.Category}</div>
                          </div>
                        </div>`)
                  break
                }
              }
              $('#Event-Cards').empty()
              $('#Event-Cards').append(
                `<H1 class="title is-1">Check out My Events tab! Or Search a new Zipcode!</H1>`)

            })
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
  if (LastEvent !== null) {
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
  }
  if (LastFood !== null) {
    $('#modal').append(`
    <div class="card">
    <div class="card-content">
      <div class="content">${LastFood.Name}</div>
      <div class="content">${LastFood.Location}</div>
      <div class="content">${LastFood.Category}</div>
    </div>
  </div>
    `)
  }
}