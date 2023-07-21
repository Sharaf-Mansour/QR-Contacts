var url = "https://github.com/2Hasan2.github.io/Qr-Contact/profile.html?BIQwziB2B+C2D2ALEsCmATaiBOBGALAKwDMuADAAIDmsIAlgDYB0AxvLNGboYfrgOwA2ABz5B0AGbZ4kAC4ACVJEwA5APIAVeQHV42ANbQQDAB7yJ8AK7KQsujOioqATwAOsySBaoARvHiGADJ0kPoYAJIwGqgMTtgoQA";
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

}
);
