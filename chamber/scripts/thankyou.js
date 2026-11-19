const params = new URLSearchParams(window.location.search);

function displayValue(elementId, parameterName) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = params.get(parameterName) || "Not provided";
    }
}

displayValue("first-name", "firstName");
displayValue("last-name", "lastName");
displayValue("email", "email");
displayValue("phone", "phone");
displayValue("business-name", "businessName");

const timestampValue = params.get("timestamp");
const timestampElement = document.getElementById("timestamp");

if (timestampValue && timestampElement) {
    const date = new Date(timestampValue);

    timestampElement.textContent = isNaN(date.getTime())
        ? "Not available"
        : date.toLocaleString();
}

const yearElement = document.querySelector("#current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);
    });
}