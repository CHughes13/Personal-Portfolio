// Get the date //
var date = new Date(); //Create an instance of a Date object
console.log(date); // Print the date in the console

// Display current date info //
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log("The current month is " + currentMonth); //  Current month - 1
console.log("The current day is " + currentDay); // Current day of the week
console.log("The current date is " + currentDate); // Current date/number
console.log("The current year is " + currentYear); // Current year


// Important date info //
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

// Display the correct month //
var title = document.getElementById("title");
title.innerHTML = months[currentMonth];

// Update the calendar info //
var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function () {
    let habits = prompt("What's your habit?", habitTitle.innerHTML)

    // Check if habits is null (user clicked "Cancel") or an empty string (user submitted nothing)
        if (!habits || habits.length == 0) {
            habitTitle.innerHTML = "Click here to add your habit";
        } else {
            habitTitle.innerHTML = habits;
        }
    };

// Set the correct number of days in a particular month //
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");

// Setup the calendar days //
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");

for (var i = 0; i < days.length; i++) {
    var day = days[i].getElementsByClassName("day");
    for (var j = 0; j < day.length; j++) {
        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            if (dayCount == currentDate - 1) {
                day[j].setAttribute("style", "border: 2px solid #446661");
            }
            dayCount++
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:white");
        }
    }
}

// Initialise completed array //
var completed = new Array(31);
for (var i = 0; i < dayCount; i++) {
    var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if (tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

console.log("completed array: " + completed);
console.log("total days completed: " + daysCompleted);

// Check local storage and update completed array //
for (var i = 0; i < currentDate; i++) {
    var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
console.log(tempString);

var chosenDay = localStorage.getItem(tempString);
console.log(i + 1 + ":" + chosenDay);
var chosenDayDiv = document.getElementById("day" + (i + 1));
if (chosenDay === "true") {
    chosenDayDiv.style.backgroundColor = "#e3aaaa";
} else if (chosenDay === "false") {
    chosenDayDiv.style.backgroundColor = "white";
}
}

// Update completed days/habits on calendar //
var dayDivs = document.querySelectorAll(".day");

for (var i = 0; i < dayDivs.length; i++) { // Iterate over all valid days
    dayDivs[i].onclick = function (e) {
        var num = parseInt(e.target.innerText); // Get day number

        // Prevent clicking on future days
        if (num > currentDate) {
            return
        }
        var selectedDate = document.getElementById(e.target.id);
        var storageString = "" + (currentMonth + 1) + "-" + num + "-" + currentYear;

        if (localStorage.getItem(storageString) === "false") {
            selectedDate.style.backgroundColor = "#e3aaaa";
            localStorage.setItem(storageString, "true");
            daysCompleted++;
        } else if (localStorage.getItem(storageString) === "true") {
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, "false");
            daysCompleted--;
        }

        totalDays.innerHTML = daysCompleted + "/" + dayCount;
        console.log(daysCompleted, currentDate);
        if (daysCompleted === currentDate) {
            alert("Great progress!");
        }
    }
}

// Reset button //
var resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
        var tempStrings = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor = "white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}