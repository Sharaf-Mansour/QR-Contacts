var url = window.location.href;
var input = LZString.decompressFromEncodedURIComponent(url.slice(url.indexOf("?") + 1)); 

var url = url.slice(0, url.indexOf("?") + 1) + input;
let data = url.slice(url.indexOf('?') + 1).split('~');

let name = data[0] + " " + data[1];
let email = data[2];
let phone = data[3];
let title = data[4];
let company = data[5];
let workinfo = data[6];
let locationinfo = data[7];
let faceBook = data[8];
let linkedIn = data[9];
let telegram = data[10];
let latitude = data[11];
let longitude = data[12];
let photo = data[13];
 

 
    const map = L.map('mapid').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 18,
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);


// use jqery to set the value of the span tags
$(document).ready(function () {
    $("#name").text(name);
    // set href of the phone number to be the phone number
    $("#phone a").attr("href", "tel:" + phone);
    // set href of the email to be the email
    $("#email a").attr("href", "mailto:" + email);
    // set href of the linkedin to be the linkedin
    $("#linkedin a").attr("href", linkedIn);
    // set href of the facebook to be the facebook
    $("#facebook a").attr("href", faceBook);
    // set href of the telegram to be the telegram
    $("#telegram a").attr("href", telegram);


    // set the rest value of the span tags
    $("#title").text(title);
    $("#company").text(company);
    $("#workinfo").text(workinfo);
    $("#locationinfo").text(locationinfo);
    $("#photo").attr("src", photo);
}



);

