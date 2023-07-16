var url = window.location.href;
var input = LZString.decompressFromEncodedURIComponent(url.slice(url.indexOf("?") + 1));
var url = url.slice(0, url.indexOf("?") + 1) + input;
let data = url.slice(url.indexOf('?') + 1).split('~');

let name = data[0] + " " + data[1];
let email = data[2];
let phone = data[3];
let whatsapp = data[4];
let linkenIn = data[5];
let faceBook = data[6];
let work = data[7];
let company = data[8];

// Function to create an icon element
function createIconElement(iconClassName) {
  let iconElement = document.createElement('i');
  iconElement.className = `fab ${iconClassName}`;
  return iconElement;
}

// Create and populate the name element
let nameElement = document.createElement('div');
nameElement.id = 'name';
nameElement.innerHTML = name;
document.getElementsByClassName('contact-info')[0].appendChild(nameElement);

// Create and populate the email element
email !== "" && (() => {
  let emailElement = document.createElement('a');
  emailElement.id = 'email';
  emailElement.innerHTML = email;
  emailElement.href = `mailto:${email}`;
  emailElement.prepend(createIconElement('fas fa-envelope'));
  document.getElementsByClassName('contact-info')[0].appendChild(emailElement);
})();

// Create and populate the phone element
phone !== "" && (() => {
  let phoneElement = document.createElement('a');
  phoneElement.id = 'phone';
  phoneElement.innerHTML = phone;
  phoneElement.href = `tel:${phone}`;
  phoneElement.prepend(createIconElement('fas fa-phone'));
  document.getElementsByClassName('contact-info')[0].appendChild(phoneElement);
})();

// Create and populate the WhatsApp element
whatsapp !== "" && (() => {
  let whatsappElement = document.createElement('a');
  whatsappElement.id = 'whatsapp';
  whatsappElement.innerHTML = whatsapp;
  whatsappElement.href = `https://wa.me/${whatsapp}`;
  whatsappElement.prepend(createIconElement('fa-whatsapp'));
  document.getElementsByClassName('contact-info')[0].appendChild(whatsappElement);
})();

// Create and populate the LinkedIn element
linkenIn !== "" && (() => {
  let linkenInElement = document.createElement('a');
  linkenInElement.id = 'linkenIn';
  linkenInElement.innerHTML = linkenIn;
  linkenInElement.href = linkenIn;
  linkenInElement.prepend(createIconElement('fa-linkedin'));
  document.getElementsByClassName('contact-info')[0].appendChild(linkenInElement);
})();

// Create and populate the Facebook element
faceBook !== "" && (() => {
  let faceBookElement = document.createElement('a');
  faceBookElement.id = 'faceBook';
  faceBookElement.innerHTML = faceBook;
  faceBookElement.href = faceBook;
  faceBookElement.prepend(createIconElement('fa-facebook'));
  document.getElementsByClassName('contact-info')[0].appendChild(faceBookElement);
})();

// Create and populate the work element
work !== "" && (() => {
  let workElement = document.createElement('div');
  workElement.id = 'work';
  workElement.innerHTML = work;
  workElement.prepend(createIconElement('fas fa-briefcase'));
  document.getElementsByClassName('contact-info')[0].appendChild(workElement);
})();

// Create and populate the company element
company !== "" && (() => {
  let companyElement = document.createElement('div');
  companyElement.id = 'company';
  companyElement.innerHTML = company;
  companyElement.prepend(createIconElement('fas fa-building'));
  document.getElementsByClassName('contact-info')[0].appendChild(companyElement);
})();
