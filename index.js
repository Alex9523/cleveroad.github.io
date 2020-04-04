// var today = new Date().toISOString();
// convertDateToUTC(date) ;{ 
//     return new Date(date.getUTCFullYear(), 
//                     date.getUTCMonth(), 
//                     date.getUTCDate(), 
//                     date.getUTCHours(), 
//                     date.getUTCMinutes(), 
//                     date.getUTCSeconds()) }
    var element = document.querySelector('.actual-time');
    element.innerHTML = "today";


// function initMap() {
//     var myLatLng = {lat: -34.345, lng: 131.044};

//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: myLatLng
//     });

//     var marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       title: 'Hello World!'
//     });
//   }
  
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const requestURLForIss = "http://api.open-notify.org/iss-now.json"
const requestURLForAstros ="http://api.open-notify.org/astros.json"
const xhr = new XMLHttpRequest();

xhr.open('GET', requestURLForIss, true);

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            const data = xhr.responseText
            const jsonResponse = JSON.parse(data);
            console.log(jsonResponse["iss_position"]);
        }
    }
};
xhr.send(null);
// xhr.open('GET', requestURLForAstros, true);

// xhr.onload = function () {
//     if (xhr.readyState === xhr.DONE) {
//         if (xhr.status === 200) {
//             const data = xhr.responseText
//             const jsonResponse = JSON.parse(data);
//             for(let i =0; i< jsonResponse["people"].length;i++)
//             console.log(jsonResponse["people"][i]["name"]);
//         }
//     }
// };
// xhr.send(null);

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
