// Current date and display it at the top of the page
var currentDate = dayjs().format("dddd, MMMM D");
$("#currentDay").text(currentDate);


// Function to color code time blocks based on current time
function updateSchedule() {
  var currentHour = dayjs().format("H");
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
    // Add or remove classes to color code time blocks based on current time
    if (blockHour < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("present future");
    }
    else if (blockHour == currentHour) {
      $(this).addClass("present");
      $(this).removeClass("past future");
    }
    else {
      $(this).addClass("future");
      $(this).removeClass("past present");
    }
  });
}

// Call updateSchedule function to color code time blocks when page loads.
updateSchedule();

// Call updateSchedule function every 5 minutes to keep time blocks color coded
setInterval(function() {
  updateSchedule();
}, 300000);

// Function to save events to local storage
function saveEvent() {
  var timeBlock = $(this).parent();
  var hour = timeBlock.attr("id");
  var description = timeBlock.children(".description").val();
  localStorage.setItem(hour, description);


  var messageElement = $("<p>")
    .addClass("save-message")
    .text("Saved!")
    .hide();
  timeBlock.append(messageElement);

  // Fade Saved! after 2 seconds
  messageElement.fadeIn(500).delay(500).fadeOut(500, function() {
    $(this).remove();
  });
}


// Function to load saved events from local storage
function loadEvents() {
  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var savedDescription = localStorage.getItem(hour);
    if (savedDescription !== null) {
      $(this).children(".description").val(savedDescription);
    }
  });
}

// Call loadEvents function to load saved events on page load
loadEvents();

