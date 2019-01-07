var myLocation = [52.5107365, 13.3699008];
var mymap = L.map("mapid").setView(myLocation, 3);

var mapBoxToken =
  "pk.eyJ1IjoicGF1bGJvZWNrIiwiYSI6ImNqZmo5Y3dsMzZjd2gyeHBkeHp0Mmt6eXQifQ.8H4_R2UaKJZ_rWH1Z3vdFg";

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: mapBoxToken
  }
).addTo(mymap);

var countries = [];
fetch("https://restcountries.eu/rest/v2/all")
  .then(res => res.json())
  .then(res => {
    countries = res;
  })
  .then(setup);

function setup() {
  for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    setupformarker(country);
    setupList(country);
    setUpFlags(country);
  }
}
function setupList(country) {
  selectCountry = document.querySelector("#selectCountry");
  var option = document.createElement("option");
  option.innerHTML = country.name;
  option.value = country.name;
  selectCountry.appendChild(option);
}
function setUpFlags(country) {
  var flagImg = country.flag;
  var img = document.createElement("img");
  img.src = flagImg;
  img.width = 35;
  var flags = document.querySelector(".flags");
  flags.appendChild(img);
  var flag = document.createElement("div");
}
var outputSearch = document.querySelector("#searchOutput");
var inputSearch = document.querySelector("#selectCountry");
var btnSearch = document.querySelector("#get");

btnSearch.onclick = function() {
  var searchName = inputSearch.value;

  for (i = 0; i < countries.length; i++) {
    var country = countries[i];
    console.log(country.name, selectCountry.value);
    if (country.name === selectCountry.value) {
      var popup = L.popup()
        .setLatLng(country.latlng)
        .setContent(
          `<p>${country.capital}<br><img width=25 src=${
            country.flag
          }><br>number of people ${country.population} </p>`
        )
        .openOn(mymap);
      console.log(country);
    }
  }
};

function setupformarker(country) {
  var marker = L.marker(country.latlng).addTo(mymap);
  marker
    .bindPopup(
      `<b>${country.name}</b><br>${country.capital}.<br><img  width="35" src="${
        country.flag
      }">`
    )
    .openPopup();
  console.log(country.name, country.latlng, country.flag);
}

var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on("click", onMapClick);
