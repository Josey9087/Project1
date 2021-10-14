// Activaates the function which displays the last chosen food and place in the My Events tab.
LastData()
// Displays today's date above the search bar.
$('#today').text("Today is: " + moment().format("MM/DD/YYYY"))
// Event listener for the search button to search by zipcode this triggers a function, followed by saving the zipcode as a variable.
$("#search").on("click", function () {
  var zipcode = $("#Zipput").val()
  // Below is the call to the SeatGeek API which is used to grab events near the zipcode. Parameters are set to get a maximum of 6 events during a call.
  $.ajax({
    type: "GET",
    url: 'https://api.seatgeek.com/2/events?geoip=' + zipcode + '&per_page=6&listing_count.gt=0&client_id=MjM3ODMwNDN8MTYzMzU2OTE4MC42OTA3NDk0',
    async: true,
    dataType: "json",
  })
  // The code below activates when the call is successfull. It turns the response into the variable 'json' which is in json format.
  // After it resets the Event-Cards to ensure nothing is displayed when displaying the new events.
  // A for loop begins which runs 6 times in order to iterate through the response of the API call. A variable is created in order to save data from each.
  // As the data is saved it is stringified before being placed into local stoarage.
  // A new variable is set to the parsed array of objects currently looping in local storage.
  // Jquery is used to grab the Event-Cards id and append html tags that contains the values of the objects from the new parsed variable.
    .done(function (json) {
      // Parse the response.
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
      // A function that is activated when the tag with the class "Pick" is clicked.
      // Variables are grabbed from the data attribues within the current clicked element.
      // The modal is emptied out so that nothing is there before appending.
      // A for loop begings that loops through everything in local storage and matches the name of the key to the name of the data-key attribute.
      // When the if statment comparing each key name in the local storage comes out to be true it saves a new key containing all of the content of the currently looped local storage.
      // The content is pulled out and then parsed in order to append html tags into the modal with values of the parsed content. The loop then breaks.
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
        // The tag that contains the Javascript is emptied out in order to append the new Food location options.
        // A call is made to the FourSquare API using the latitude and longitude coordinates of the chosen event.
        // Parameters are set to find food options and only display 6 options.
        $('#Event-Cards').empty()
        $.ajax({
          type: "GET",
          dataType: "json",
          url: 'https://api.foursquare.com/v2/venues/explore?client_id=IUF2O13MUPZXUU1ALLEXY1PO4XJG2RSIBVBZUJDTL1VIDIE1&client_secret=MDHH5GDE5ILC3JKCOQS14BGKCDZPQBZ1XO3Y2WVU3XYELWNL&ll=' + Lat + ',' + Lon + '&section=food&limit=6&v=20180323',
          data: {}
        })
        // // The code below activates when the call is successfull. It turns the response into the variable 'json' which is in json format.
  // A for loop begins which runs 6 times in order to iterate through the response of the API call. A variable is created in order to save data from each.
  // As the data is saved it is stringified before being placed into local stoarage.
  // A new variable is set to the parsed array of objects currently looping in local storage.
  // Jquery is used to grab the Event-Cards id and append html tags that contains the values of the objects from the new parsed variable.
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
                  // A function that is activated when the tag with the class "Food" is clicked.
      // Variables are grabbed from the data attribues within the current clicked element.
      // A for loop begings that loops through everything in local storage and matches the name of the key to the name of the data-key attribute.
      // When the if statment comparing each key name in the local storage comes out to be true it saves a new key containing all of the content of the currently looped local storage.
      // The content is pulled out and then parsed in order to append html tags into the modal with values of the parsed content. The loop then breaks.
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
              // The event card is emptied and in order to append a tag that displays "Check out My Events tab! Or Search a new Zipcode!</" 
              $('#Event-Cards').empty()
              $('#Event-Cards').append(
                `<H1 class="title is-1">Check out My Events tab! Or Search a new Zipcode!</H1>`)

            })
          })
          // On failure to call the FourSquare API
          .fail(function (jqXHR, textStatus, errorThrown) {
          // Code for handling errors
          });
      })
    })
    // On failure to call the SeatGeek API
    .fail(function (xhr, status, err) {
      console.log("error")
      // This time, we do not end up here!
    });
})


// Finds the class modal and class modal-background, on clicking the My Events tab the modal is displayed and upon clicking the background it closes.
const Modal = $('.modal')
const ModalBg = $('.modal-background')
$('#Eventbtn').on("click", function () {
  Modal.addClass("is-active");
});

ModalBg.on("click", function () {
  Modal.removeClass("is-active");
});

//

// The function that places the last chosen Event and Food location into the modal.
// Finds the key Chosen and ChosenFood key in order to parse the content from local storage.
// If those variables don't come out null then modal id has tags appended to it, those tags contain values of the parsed array from the local storage.
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