console.log("script loaded 🫡")

// variable & selection of all circles

const circles = document.querySelectorAll(".circle");

// Loop via forEach to have access to individual items

circles.forEach((item, index, arr) => {
    // adding a click event
    item.addEventListener("click", () => {
        // toggle a class for each class
        console.log("circle clicked: " + index);
        item.classList.toggle("move-me");
    });
})