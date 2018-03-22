import $ from 'jquery';
import { Stolen } from './stolen'
export let stolen;
var displayData = function(results) {
  if (results.bikes.length == 0) {
    $(".bikeList").text('No matches');
  } else {
    $(".bikeList").text('15 most recently stolen bikes matching your search:')
    results.bikes.forEach(function(bike) {
      $(".bikeList").append('<li>' + bike.title + ', ' + '<span class="location">' + bike.stolen_location + '</span>' + ', ' + bike.frame_colors +', ' + bike.manufacturer_name +', ' + bike.serial +'</li>');
      });
    }
  }

  var displaySearch = function() {
    $(".bikeList").text('Finding results...')
  }

  var errorMessageUser = function() {
    $(".bikeList").text('There was an error processing your request.');
  }

$(document).ready(function() {
  $('#formLocation').submit(function(event) {
    let parameters = {'city': '*', 'color': '', 'manufacturer': ''};
    event.preventDefault();
    $(".bikeList").text('');
    let city = $('#city').val();
    let color = $('#color').val();
    let manufacturer = $('#manufacturer').val();
    if (city.length > 0) {
      parameters.city = city;
    }
    if (color.length > 0) {
      parameters.color = color;
    }
    if (manufacturer.length > 0) {
      parameters.manufacturer = manufacturer;
    }

    stolen = new Stolen(parameters);
    stolen.makeRequest(displayData,displaySearch,errorMessageUser);

    let locations = document.getElementsByClassName('location');
    let locationsIsolated = [];
    Array.from(locations).forEach(function(item) {
      locationsIsolated.push(item.innerHTML);
    });
    // locations = locations.map(x => x.innerHtml);
    setTimeout(function(){ console.log(stolen.single,'yep');}, 5000);
    // console.log(stolen.single,'yep');

    console.log(locationsIsolated);

    $('#mapButton').click(function(event) {
      stolen.getLatLong();
    })

  });

});
