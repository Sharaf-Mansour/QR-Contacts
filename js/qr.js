$(document).ready(function () {



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

        var vCardData = createVCard(firstNameValue, lastNameValue, emailValue, phoneValue, titleValue, companyValue, workInfoValue);

        var pageurl = window.location.href+"profile";
        var QrUrlDate = `${firstNameValue}~${lastNameValue}~${emailValue}~${phoneValue}~${titleValue}~${companyValue}~${workInfoValue}~${locationValue}~${facebookValue}~${linkedinValue}~${telegramValue}`;
        var compressedString = `${pageurl}?` + LZString.compressToEncodedURIComponent(QrUrlDate);

        var qr = new QRious({
            element: document.getElementById('qr-code'),
            value: vCardData,
            size: 200,
            background: "#ffffff",
            foreground: "#000000",
            level: 'H',
            padding: null,
            mime: 'image/png'
        });

        var qrUrl = new QRious({
            element: document.getElementById('qrurl-code'),
            value: compressedString,
            size: 200,
            background: $('#background-color').val(),
            foreground: $('#foreground-color').val(),
            level: 'H',
            padding: null,
            mime: 'image/png'
        });
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
NOTE:${workInfo}
ADR;TYPE=WORK:;;${location};;;;;;
URL:${linkedin}
URL:${facebook}
URL:https://t.me/${telegram}
END:VCARD`;

        return vCard;
    }
});