

const map = L.map('mapid');
function SelectLocation() {
    $("#mapid").toggleClass("show");
    $("#close").toggleClass("show");
    $("#mapid").css("height", "100vh");
    $("#mapid").css("width", "100%");
    $("#mapid").css("z-index", "1");
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            map.setView([latitude, longitude], 13);
        }, () => {
            console.error('Error: The Geolocation service failed.');
        });
    } else {
        console.error('Error: Your browser doesn\'t support geolocation.');
    }
}

$("#btn-location").click(function () {
    SelectLocation();
});


let latitude = 0;
let longitude = 0;
let background = "#fff";
let foreground = "#1278C2";


$(document).ready(function () {
    $(".close").on("click", () => {
        $("#mapid").removeClass("show");
        $("#close").removeClass("show");

    });

    let marker;

    map.on('click', (event) => {
        latitude = event.latlng.lat;
        longitude = event.latlng.lng;
        if (marker) {
            marker.remove();
        }
        marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}`).openPopup();
        $("#location").val(latitude + "," + longitude);
        generateQRCode();

    });
    $('#generate-qr').click(function (e) {
        e.preventDefault();
        generateQRCode();
    });

    $('#first-name, #last-name, #email, #phone, #title, #company, #work-info, #location, #facebook, #linkedin, #telegram').change(function () {
        generateQRCode();
    });

    function generateQRCode() {
        var firstNameValue = $("#first-name").val();
        var lastNameValue = $("#last-name").val();
        var emailValue = $("#email").val();
        var phoneValue = $("#phone").val();
        var titleValue = $("#title").val();
        var companyValue = $("#company").val();
        var locationValue = $("#location").val();
        var workInfoValue = $("#work-info").val();
        var facebookValue = $("#facebook").val();
        var linkedinValue = $("#linkedin").val();
        var telegramValue = $("#telegram").val();

        $(".name").text(firstNameValue + " " + lastNameValue);
        $(".job").text(titleValue);

        var vCardData = createVCard(firstNameValue, lastNameValue, emailValue, phoneValue, titleValue, companyValue, workInfoValue, locationValue, facebookValue, linkedinValue, telegramValue);

        var pageurl = window.location.href + "profile.html";
        var QrUrlDate = `${firstNameValue}~${lastNameValue}~${emailValue}~${phoneValue}~${titleValue}~${companyValue}~${workInfoValue}~${locationValue}~${facebookValue}~${linkedinValue}~${telegramValue}~${latitude}~${longitude}`;
        var compressToEncodedURIComponent = LZString.compressToEncodedURIComponent(QrUrlDate);
        var compressedString = `${pageurl}?` + compressToEncodedURIComponent;
        $("#linkContact").attr("href", "profile.html?" + compressToEncodedURIComponent);
        var qr = new QRious({
            element: document.getElementById('qr-code'),
            value: vCardData,
            size: 200,
            background: background,
            foreground: foreground,
            level: 'H',
            padding: null,
            mime: 'image/png'

        });

        var qrUrl = new QRious({
            element: document.getElementById('qrurl-code'),
            value: compressedString,
            size: 200,
            background: background,
            foreground: foreground,
            level: 'H',
            padding: null,
            mime: 'image/png'
        });

        $("#colorPicker").on("input", () => {
            const color = $("#colorPicker").val();
            if (isLightColor(color)) {
                background = "#000";
                foreground = color;
                qr.set({
                    foreground: color,
                    background: "#000"
                });
                qrUrl.set({
                    foreground: color,
                    background: "#000"
                });
            } else {
                background = "#fff";
                foreground = color;
                qr.set({
                    foreground: color,
                    background: "#fff"
                });
                qrUrl.set({
                    foreground: color,
                    background: "#fff"
                });
            }
        });

        function isLightColor(color) {
            const hex = color.replace("#", "");
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luma > 160;
        }

    }

    function createVCard(firstName, lastName, email, phone, title, company, workInfo, location, facebook, linkedin, telegram) {
        var vCard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
EMAIL:${email}
TEL;TYPE=CELL:${phone}
ORG:${company}
TITLE:${title}
  END:VCARD`;

        return vCard;
    }
});