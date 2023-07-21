// title
document.addEventListener("DOMContentLoaded", function () {
    function loadSVG() {
        fetch("svg/title.html")
            .then(response => response.text())
            .then(svgData => {
                const logoDiv = [...document.getElementsByClassName("title")];
                logoDiv.map((item) => {
                    item.innerHTML += svgData;
                    item.innerHTML += svgData;
                    item.innerHTML += svgData;
                    item.innerHTML += "SCAN CODE TO ADD";
                    item.innerHTML += svgData;
                    item.innerHTML += svgData;
                    item.innerHTML += svgData;
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadSVG();
});


//logo
document.addEventListener("DOMContentLoaded", function () {
    function loadSVG() {
        fetch("svg/logo.html")
            .then(response => response.text())
            .then(svgData => {
                const logoDiv = [...document.getElementsByClassName("logo")];
                logoDiv.map((item) => {
                    for (let i = 0; i < 3; i++) {
                        item.innerHTML +=
                            `<div>
                        <span>Qr</span>
                        ${svgData}
                        <div>Contact</div>
                    </div>`;
                    }
                });

            })
            .catch(error => {
                console.error(error);
            });
    }

    loadSVG();
});