// GET FORM DATA FROM URL

const params = new URLSearchParams(window.location.search);


// FUNCTION TO DISPLAY FORM VALUES

function displayValue(elementId, parameterName) {

    const element = document.getElementById(elementId);

    if (element) {

        const value = params.get(parameterName);

        element.textContent = value || "Not provided";

    }

}


// DISPLAY REQUIRED INFORMATION

displayValue("first-name", "firstName");

displayValue("last-name", "lastName");

displayValue("email", "email");

displayValue("phone", "phone");

displayValue("business-name", "businessName");


// DISPLAY TIMESTAMP

const timestampValue = params.get("timestamp");

const timestampElement = document.getElementById("timestamp");

if (timestampValue && timestampElement) {

    const date = new Date(timestampValue);

    timestampElement.textContent = isNaN(date.getTime())
        ? "Not available"
        : date.toLocaleString();

}


// FOOTER YEAR

const yearElement = document.querySelector("#current-year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// MOBILE NAVIGATION

const menuButton = document.querySelector("#menu-button");

const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

}