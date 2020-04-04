$(document).ready(function(){onLoad()})
function startTime() {
    const date=new Date();
    let time = date.toLocaleString('en', { hour: 'numeric' , minute: 'numeric'});
    let dayOfWeek = date.toLocaleString('en', { weekday: 'long' });
    let numberOfWeek = date.getDate();
    let month = date.toLocaleString('en', { month: 'long' } );
    let year = date.toLocaleString('en', {year: 'numeric'})
    $('#txt').html(`<h3>Current UTC time: ${time}</h3> <p>${dayOfWeek}, ${numberOfWeek} ${month} ${year}</p> `);
    
}



const requestURLForAstros ="http://api.open-notify.org/astros.json"
const requestURLForIss = "http://api.open-notify.org/iss-now.json"
const xhr = new XMLHttpRequest();
const xhr1 = new XMLHttpRequest();


function show(){

xhr.open('GET', requestURLForIss, true);
xhr.send(null);
xhr.onload = function () {
    
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            const data = xhr.responseText
            const jsonResponse = JSON.parse(data);
            var a = Number(jsonResponse["iss_position"]["latitude"]);
            var b = Number(jsonResponse["iss_position"]["longitude"]);
            console.log(a, typeof(a),b, typeof(b))
            const element = $('.actual-located');
            element.html(`Latitude: ${a} Longitude: ${b}`);
                                 
        }
    }
    initMap(a,b)
};
}

function onLoad(){
    show();  
    setInterval('show()',5000);  
    startTime()
    setInterval('startTime()',5000);
}



function initMap(lat, lng) {
    var myLatLng = {lat: lat , lng: lng};

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
            
            const astronauts= $(".astronauts");
            for(let i =0; i< jsonResponse["people"].length;i++){
                const str = `<div class="astronaut-name"><p><i class="material-icons middle">account_circle</i>${jsonResponse["people"][i]["name"]}</p></div>`;
                astronauts.append(str)
            }
            astronauts.append(`<p>Total amount: <b>${jsonResponse["number"]}</b> people on ISS</p>`);
        }
    }
};
