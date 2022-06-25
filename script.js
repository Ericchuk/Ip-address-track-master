let address = document.querySelector(".ipAddress");
let locationVal = document.querySelector(".locationVal");
let timeZone = document.querySelector(".timezoneVal");
let utc = document.querySelector(".utcVal");
let isp = document.querySelector(".ispVal");
let data = document.querySelector(".ipAddress");
let map = document.querySelector(".mapImage");
let input = document.querySelector("input");
let arrow = document.querySelector("img")

let url = 'https://api.ipify.org/?format=json';
async function fetchData(){
    let response = await fetch(url);
    let result = await response.json();
    input.value = result.ip;
    // console.log(result);
}
fetchData();


async function fetchDataClick(){
    let web = "https://geo.ipify.org/api/v2/country,city?apiKey=at_z5c98dBARZ3etXRIc4luHcBfmabIU&ipAddress="
    // let web = "https://geo.ipify.org/api/v2/country?apiKey=at_z5c98dBARZ3etXRIc4luHcBfmabIU&ipAddress=";
    let combineBothAPI = `${web} ${url}`
    let dataResponse = await fetch(web);
    let dataResult = await dataResponse.json();
    address.innerHTML = input.value;
    let region = await dataResult.location.region;
    let country = await dataResult.location.country;
    locationVal.innerHTML = `${region}, ${country}`;
    let timeZoneValue = await dataResult.location.timezone;
    timeZone.innerHTML = `UTC ${timeZoneValue}`
    isp.innerHTML = await dataResult.isp
    let lat = await dataResult.location.lat;
    let long = await dataResult.location.lng;
    console.log(typeof dataResult, lat, long);

    let map = L.map('map').setView([lat, long], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([lat, long]).addTo(map)
    .bindPopup(`${region}, ${country}`)
    .openPopup();
}

fetchDataClick();
arrow.addEventListener("click", fetchDataClick);
