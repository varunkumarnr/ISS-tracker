let latitudeText = document.querySelector(".latitude");
let longitudeText = document.querySelector(".longitude");
let timeText = document.querySelector(".time");
let speedText = document.querySelector(".speed");
let altitudeText = document.querySelector(".altitude");
let visiblityText = document.querySelector(".visiblity");
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
  latitudeText.innerHTML = lat;
  longitudeText.innerHTML = long;
  timeText.innerHTML = timestamp;
  speedText.innerHTML = speed;
  altitudeText.innerHTML = altitude;
  visiblityText.innerHTML = visiblity;
}

findISS();
setInterval(findISS, 2000);
