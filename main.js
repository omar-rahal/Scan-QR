const wrapper = document.querySelector(".wrapper"),
    form = document.querySelector("form"),
    fileInput = document.querySelector("input"),
    infoText = document.querySelector(".content p"),
    detailsQr = document.querySelector(".details p"),
    linkQr = document.querySelector(".details a");

function featchRequest(formData, file) {
    // Change the info text while frtching data
    infoText.innerHTML = "Scanning QR Code ...";

    // Sening POST request to server api with passing
    // form data as body to getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData,
    })
        .then((result) => result.json())
        .then((result) => {
            console.log(result);
            // active class will add when the change happen and the img is checked by using api
            // when clss active is adding we can make css code tha will make the details display
            // block and none the anouther things we don't need it ex >> .wrapper.active .details {do something}
            setTimeout(() => {
                wrapper.classList.add("active");
            }, 1000);
            // Add img u pload
            //  URL.createObjectURL()  MEANING OF
            // that is creats string containing a URL of passed object
            // what is the file go down and take alook about the file when we concole him i ssill give u object of the img
            let resultData = result[0].symbol[0].data;
            form.querySelector("img").src = URL.createObjectURL(file);
            //   Change the text of qr code
            detailsQr.innerHTML = resultData;

            linkQr.setAttribute("href", resultData);
            console.log(resultData);
            if (resultData === null) {
                detailsQr.innerHTML = "This QR is Not Valid ";
                linkQr.innerHTML = "No Link To Check";
            }
            infoText.innerHTML = "Upload QR Code To Scan";
        });
}

/*  OnChange Event >  
-Is Working Onley In Input Type > File
-It lays out to us is working when the user choose or select a file 
and here is the point we need to catch the file in our hand 
and the ex in the buttom is lays out that to us 

>> if u say u need to change >> Change Event to CLick the data we need to grab it will come when we click and we need it 
after uer click and choose the file he want to upload 
*/

fileInput.addEventListener("change", (e) => {
    // e.target is the input we will click into ok if we say
    // let file = fileInput.files; // === Same result
    let file = e.target.files[0]; // index 0 to getting user selected file

    if (!file) return; //  في الفاضي فبتوقفه  API  عشان منبعتش   

    let formData = new FormData(); // creat new form data object
    formData.append("file", file); // adding selected file to form data
    console.log(file);

    // new FormData  MEANING
    // In JavaScript, new FormData() creates a new instance of the FormData object. This object is typically
    //used to construct and manipulate HTML form data in a convenient way.It's commonly used when working with forms
    //in web development to gather data from form elements and send it to a server using techniques like AJAX or the Fetch API.

    /*
        // Yes, many web APIs require or support the use of FormData for sending data from the client to the server.
        This is especially true for APIs that handle form submissions, file uploads, and data uploads in general. 
        Here are a few scenarios where FormData is commonly used with web APIs:
    
        Overall, FormData is a versatile tool for sending data to web APIs and is commonly used in a wide range of web development scenarios. 
        Its support for form submissions, file uploads, multipart requests, and data uploads 
        makes it a valuable asset for developers building web applications that interact with external APIs.
    */

    featchRequest(formData, file); //make the form data is a prameter for this function
});

// When We Click Any Where in the form it will click into the link
form.addEventListener("click", () => fileInput.click());

// Buttons events
document.addEventListener("DOMContentLoaded", () => {
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
});
