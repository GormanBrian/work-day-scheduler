let startTime = 9; // 9AM
let endTime = 17; // 5PM

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Generate time blocks programmatically
  let hour = dayjs().hour();
  for (let i = startTime; i <= endTime; i++) {
    let id = "hour-" + i;
    let current = "future";
    if (hour == i) current = "present";
    else if (hour > i) current = "past";
    // Create time block and append it to the outer container
    $("#time-block-container").append(
      $('<div class="row time-block"></div>')
        .attr("id", id)
        .addClass(current)
        .append(
          $('<div class="col-2 col-md-1 hour text-center py-3"></div>').text(
            i <= 12 ? `${i}AM` : `${i - 12}PM`
          )
        )
        .append(
          $(
            '<textarea class="col-8 col-md-10 description" rows="3"></textarea>'
          ).val(localStorage.getItem(id) ?? " ")
        )
        .append(
          $(
            '<button class="btn saveBtn col-2 col-md-1" aria-label="save">'
          ).append($('<i class="fas fa-save" aria-hidden="true"></i>'))
        )
    );
  }

  $(".saveBtn").on("click", function () {
    // Save the textarea value to local storage
    localStorage.setItem(
      $(this).parent().attr("id"),
      $(this).siblings("textarea").val()
    );
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

  // Show HTML after changes have been made
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});
