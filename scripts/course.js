
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 3,
        completed: false
    }
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach((course) => {
        const card = document.createElement("div");

        card.classList.add("course-card");
        card.classList.add(
            course.completed ? "completed" : "incomplete"
        );

        card.textContent =
            `${course.subject} ${course.number} - ${course.title}`;

        courseList.appendChild(card);
    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent =
        `The total credits for courses listed above is ${totalCredits}`;
}

function filterCourses(filter) {
    let filteredCourses;

    if (filter === "all") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(
            (course) => course.subject === filter
        );
    }

    displayCourses(filteredCourses);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterCourses(button.dataset.filter);
    });
});

displayCourses(courses);