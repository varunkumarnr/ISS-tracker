let latitudeText = document.querySelector(".latitude");
let longitudeText = document.querySelector(".longitude");
let timeText = document.querySelector(".time");
let speedText = document.querySelector(".speed");
let altitudeText = document.querySelector(".altitude");
let visiblityText = document.querySelector(".visiblity");
let nearme = document.querySelector(".nearme");
// let map = document.getElementById("mapid");
let lat = 12.792279;
let long = 77.732349;
let zoomLevel = 6;

let mylat = 12.79;
let mylong = 77.73;

const icon = L.icon({
  iconUrl: "./image/iss.png",
  iconSize: [90, 45],
  iconAnchor: [25, 94],
  popupAnchor: [20, -86],
});

const map = L.map("map-div").setView([lat, long], zoomLevel);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidmFydW5rdW1hcm5yIiwiYSI6ImNraDhvZW5mbjA0cmQydnM3aDg2NTRzMGYifQ.Uxzc0VyGUc_oVk0zYV9yzg",
  }
).addTo(map);

const marker = L.marker([lat, long], { icon: icon }).addTo(map);

function findISS() {
  //fetch data then convert it into json format then extract data we have to use then because the data retured is asyncronous
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((response) => response.json())
    .then((data) => {
      lat = data.latitude.toFixed(2);
      long = data.longitude.toFixed(2);
      //   lat = mylat;
      //   long = mylong;
      const timestamp = new Date(data.timestamp * 1000).toUTCString();

      const speed = data.velocity.toFixed(2);
      const altitude = data.altitude.toFixed(2);
      const visiblity = data.visibility;
      UpdateISS(lat, long, timestamp, speed, altitude, visiblity);
      ISSNearMe(lat, long);
    })
    .catch((e) => console.log(e));
}
function UpdateISS(lat, long, timestamp, speed, altitude, visiblity) {
  marker.setLatLng([lat, long]);
  map.setView([lat, long]);
  latitudeText.innerHTML = lat;
  longitudeText.innerHTML = long;
  timeText.innerHTML = timestamp;
  speedText.innerHTML = speed;
  altitudeText.innerHTML = altitude;
  visiblityText.innerHTML = visiblity;
}
function ISSNearMe(lat, long) {
  if (mylat === lat && mylong === long) {
    nearme.innerHTML = "IS";
  } else {
    nearme.innerHTML = "NOT";
  }
}
findISS();
setInterval(findISS, 2000);
