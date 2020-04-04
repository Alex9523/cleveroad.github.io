// var today = new Date().toISOString();
// convertDateToUTC(date) ;{ 
//     return new Date(date.getUTCFullYear(), 
//                     date.getUTCMonth(), 
//                     date.getUTCDate(), 
//                     date.getUTCHours(), 
//                     date.getUTCMinutes(), 
//                     date.getUTCSeconds()) }
    // var element = document.querySelector('.actual-time');
    // element.innerHTML = "today";


let howManyAstronauts =0;
const requestURLForIss = "http://api.open-notify.org/iss-now.json"
const requestURLForAstros ="http://api.open-notify.org/astros.json"
const xhr = new XMLHttpRequest();
const xhr1 = new XMLHttpRequest();



xhr.open('GET', requestURLForIss, true);
xhr.send(null);
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            const data = xhr.responseText
            const jsonResponse = JSON.parse(data);
            console.log(jsonResponse["iss_position"]);
            var element = document.querySelector('.actual-located');
            element.innerHTML = `Latitude: ${jsonResponse["iss_position"]["latitude"]}
                                 Longitude: ${jsonResponse["iss_position"]["longitude"]}`;
        }
    }
};


function initMap() {
    var myLatLng = {lat: 28.1744 , lng: 43.4108};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }

xhr1.open('GET', requestURLForAstros, true);
xhr1.send(null);
xhr1.onload = function () {
    if (xhr1.readyState === xhr1.DONE) {
        if (xhr1.status === 200) {
            const data = xhr1.responseText
            const jsonResponse = JSON.parse(data);
            
            const astronauts= document.querySelector(".astronauts");
            for(let i =0; i< jsonResponse["people"].length;i++){
                const str = `<div class="astronaut-name"><p>${jsonResponse["people"][i]["name"]}</p></div>`;
                astronauts.innerHTML += str;
            }
            astronauts.innerHTML += jsonResponse["people"].length;
        }
    }
};
// xhr.abort();

// // var today = new Date();
// // today= today.getTime();
// // console.log(today)



// //   var xhr = new XMLHttpRequest();
// //   xhr.open('GET', requestURL);
// //   xhr.responseType = 'json';
// //   xhr.send();
// //   xhr.onload = function() {
// //   console.log( xhr.responseText);
// //   }
