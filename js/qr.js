

const map = L.map('mapid');

const DownloadOfflineQR = () => {
    var firstName =  document.getElementById('first-name').value;
var lastName =  document.getElementById('last-name').value;
    const canvas = document.getElementById('qr-code');
    const a = document.createElement("a");
            a.href = canvas.src;
            a.download = `${firstName}-${lastName}-Offline-Qr.jpg`;
            a.click();
            a.remove();
}

const DownloadOnlineQR = () => {
    var firstName =  document.getElementById('first-name').value;
var lastName =  document.getElementById('last-name').value;
    const canvas = document.getElementById('qrurl-code');
    const a = document.createElement("a");
            a.href = canvas.src;
            a.download = `${firstName}-${lastName}-Online-Qr.jpg`;
            a.click();
            a.remove();

}
const DownloadOfflineQRBtn = document.getElementById('generate-offline-qr'); 
const DownloadOnlineQRBtn = document.getElementById('generate-online-qr'); 

DownloadOfflineQRBtn.addEventListener('click', () => DownloadOfflineQR());
DownloadOnlineQRBtn.addEventListener('click', () => DownloadOnlineQR());
const SelectLocation = () => {
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

        $("#colorPicker").on("blur", () => {
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
            MakeIcon();
        });

     
        MakeIcon();



        function isLightColor(color) {
            const hex = color.replace("#", "");
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luma > 160;
        }

function MakeIcon(){
    const qrurl =  document.getElementById('qrurl-code');

    const icon = new Image();
    icon.src = "icon.png"; // Replace with the path to your icon
    icon.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = qrurl.width;
        canvas.height = qrurl.height;
        const context = canvas.getContext("2d");
        context.drawImage(qrurl, 0, 0);
        
        const iconSize = 50; // Adjust the icon size as needed
        const centerX = canvas.width / 2 - iconSize / 2;
        const centerY = canvas.height / 2 - iconSize / 2;
        context.drawImage(icon, centerX, centerY, iconSize, iconSize);

        qrurl.src = canvas.toDataURL();}



        const qrc =  document.getElementById('qr-code');

        const icon2 = new Image();
        icon2.src = "icon.png"; // Replace with the path to your icon
        icon2.onload = () => {
            const canvas2 = document.createElement("canvas");
            canvas2.width = qrc.width;
            canvas2.height = qrc.height;
            const context = canvas2.getContext("2d");
            context.drawImage(qrc, 0, 0);
            
            const iconSize = 50; // Adjust the icon size as needed
            const centerX = canvas2.width / 2 - iconSize / 2;
            const centerY = canvas2.height / 2 - iconSize / 2;
            context.drawImage(icon2, centerX, centerY, iconSize, iconSize);

            qrc.src = canvas2.toDataURL();}


}

    }

    function createVCard(firstName, lastName, email, phone, title, company, workInfo, location, facebook, linkedin, telegram) {
        var vCard = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${firstName} ${lastName}
N;CHARSET=UTF-8:${lastName};${firstName};;;
EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:${email}
TEL;TYPE=CELL:${phone}
ORG;CHARSET=UTF-8:${company}
TITLE;CHARSET=UTF-8:${title}
END:VCARD`;

        return vCard;
    }
});