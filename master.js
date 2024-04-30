const wrapper = document.querySelector(".wrapper"),
    form = document.querySelector("form"),
    fileInput = document.querySelector("input"),
    infoText = document.querySelector(".content p"),
    detailsQr = document.querySelector(".details p"),
    linkQr = document.querySelector(".details a");

function featchRequest(formData, file) {
    infoText.innerHTML = "Scanning QR Code ...";

    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData,
    })
        .then((result) => result.json())
        .then((result) => {
            setTimeout(() => {
                wrapper.classList.add("active");
            }, 1000);

            let resultData = result[0].symbol[0].data;
            form.querySelector("img").src = URL.createObjectURL(file);
            detailsQr.innerHTML = resultData;
            linkQr.setAttribute("href", resultData);

            if (resultData === null) {
                setTimeout(() => {
                    wrapper.classList.remove("active");
                    infoText.innerHTML = "Upload Valid QR Code To Scan";
                    infoText.style.color = "#0885ff"

                }, 1001);
                infoText.innerHTML = "This is Not Qr Code ";
                infoText.style.color = "red"
                // detailsQr.innerHTML = "This QR is Not Qr Code";
                // form.querySelector("img").src = "imgs/red.png";
                // linkQr.innerHTML = "No Link To Check";

            } else {
                infoText.innerHTML = "Upload QR Code To Scan";
            }
        });
}

fileInput.addEventListener("change", (e) => {
    let file = e.target.files[0];

    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);

    featchRequest(formData, file);
});

form.addEventListener("click", () => fileInput.click());

const copyBtn = document.querySelector(".buttons .copy");
copyBtn.addEventListener("click", () => {
    let text = detailsQr.textContent;
    navigator.clipboard.writeText(text);
    document.querySelector(".copied").classList.add("active");
    setTimeout(() => {
        document.querySelector(".copied").classList.remove("active");
    }, 2000);
});
const closeBtn = document.querySelector(".buttons .close");
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
