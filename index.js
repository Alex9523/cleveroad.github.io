$(document).ready(
    () => { onLoad() }
);

function onLoad() {
    setCoordinates();
    setInterval('setCoordinates()', 5000);
    startTime();
    setInterval('startTime()', 5000);
    setEcipage();
    setInterval('setEcipage()', 5000);
}

//set date and time in UTC format
function startTime() {
    const date = new Date();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    let calendar = date.toUTCString();
    calendar = calendar.substring(0, 17);
    $('#txt').html(`<h3>Current UTC time: ${hour}:${minute}</h3>
                    <p>${calendar}</p>`);
}


//API astros
const requestURLForAstros = "http://api.open-notify.org/astros.json"
//api ISS
const requestURLForIss = "http://api.open-notify.org/iss-now.json"

//set and show coordinates of ISS
function setCoordinates() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestURLForIss, true);
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            let latitude = jsonResponse["iss_position"]["latitude"];
            let longitude = jsonResponse["iss_position"]["longitude"];
            const element = $('.actual-located');
            element.html(`Latitude: ${latitude} Longitude: ${longitude}`);
            initMap(latitude, longitude);
        }

    };
}

//Work with map
function initMap(lat, lng) {
    const myLatLng = { lat: Number(lat), lng: Number(lng) };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: myLatLng
    });

    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: `${lat}, ${lng}`
    });
}

//set and show name of astronauts
function setEcipage() {
    const xhr = new XMLHttpRequest();
    const astronauts = $(".astronauts");
    xhr.open('GET', requestURLForAstros, true);
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            if ($(".astronaut-name ").val() === undefined) {
                for (let i = 0; i < jsonResponse["people"].length; i++) {
                    const str = `<div class="astronaut-name">
                                    <p>
                                        <i class="material-icons middle">account_circle</i>
                                        <span class="astronaut-${i}">${jsonResponse["people"][i]["name"]}<span>
                                    </p>
                                </div>`;
                    astronauts.append(str);
                }
                astronauts.append(`<p class="total-amount">Total amount: <b>${jsonResponse["number"]}</b> people on ISS</p>`);
            } else {
                for (let i = 0; i < jsonResponse["people"].length; i++) {
                    $(`.astronaut-${i}`).html(`${jsonResponse["people"][i]["name"]}`);
                }
                $(`.total-amount>b`).html(`${jsonResponse["number"]}`);
            }
        }
    };
}
