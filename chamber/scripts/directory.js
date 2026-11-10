// Select the members container
const membersContainer = document.querySelector("#members-container");

// Select the view buttons
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

// Select navigation elements
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Display current year
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// Display last modified date
document.querySelector("#last-modified").textContent =
    document.lastModified;


// Fetch members from JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        membersContainer.innerHTML =
            "<p>Sorry, the business directory could not be loaded.</p>";

        console.error(error);
    }
}


// Display members on the page
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        let membershipName;

        if (member.membershipLevel === 3) {
            membershipName = "Gold Member";
        } else if (member.membershipLevel === 2) {
            membershipName = "Silver Member";
        } else {
            membershipName = "Member";
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>${member.info}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>

            <p class="membership">${membershipName}</p>
        `;

        membersContainer.appendChild(card);
    });
}


// Switch to grid view
gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});


// Switch to list view
listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


// Mobile navigation
menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


// Load the members when the page opens
getMembers();

