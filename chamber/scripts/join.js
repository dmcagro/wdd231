// AUTOMATIC TIMESTAMP

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


// MEMBERSHIP DIALOGS

const membershipLinks = document.querySelectorAll("[data-dialog]");

membershipLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const dialogId = link.dataset.dialog;
        const dialog = document.getElementById(dialogId);

        if (dialog) {
            dialog.showModal();
        }

    });

});


// CLOSE DIALOG BUTTONS

const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }

    });

});


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