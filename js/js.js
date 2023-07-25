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
                    item.innerHTML += "<span>SCAN CODE TO ADD</span>";
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

// Drop
$(document).ready(function () {
    const dropZone = $('#dropZone');
    const previewImage = $('#previewImage');

    // Prevent default behavior to enable dropping files
    dropZone.on('dragover', function (e) {
        e.preventDefault();
        dropZone.addClass('drag-over');
    });

    dropZone.on('dragleave', function () {
        dropZone.removeClass('drag-over');
    });

    dropZone.on('drop', function (e) {
        e.preventDefault();
        dropZone.removeClass('drag-over');

        const files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                // Display the dropped image
                const reader = new FileReader();
                reader.onload = function () {
                    previewImage.attr('src', reader.result);
                    previewImage.css({
                        display: 'block'
                    });
                    dropZone.find('span').hide();
                    dropZone.find('svg').hide();

                    // Reset the image size
                    previewImage.css({
                        width: '30%',
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please drop an image file (PNG, JPEG, etc.)');
            }
        }
    });

    // When the drop zone is clicked, trigger the click event on the hidden file input
    dropZone.on('click', function () {
        const fileInput = $('<input type="file" style="display: none;">');
        fileInput.on('change', function (e) {
            const file = e.target.files[0];
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                const reader = new FileReader();
                reader.onload = function () {
                    previewImage.attr('src', reader.result);
                    previewImage.css({
                        display: 'block'
                    });
                    dropZone.find('span').hide();
                    dropZone.find('svg').hide();

                    // Reset the image size
                    previewImage.css({
                        width: '30%',
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image file (PNG, JPEG, etc.)');
            }
        });
        fileInput.trigger('click');
    });
});

// toggle btns
$(document).ready(function () {
    $("#toggle-card-1").on("click", function () {
        $("#toggle-card-2").removeClass("active");
        $(this).toggleClass("active");
        $(".offline").appendTo(".content");
        $(".offline").css("display", "flex");
        $(".online").hide();
    });

    $("#toggle-card-2").on("click", function () {
        $("#toggle-card-1").removeClass("active");
        $(this).toggleClass("active");
        $(".online").appendTo(".content");
        $(".online").css("display", "flex");
        $(".offline").hide();
    });
});