for (let i = 9; i <= 17; i++) {
  let hour = dayjs().hour();
  let current = "future";
  if (hour == i) current = "present";
  else if (hour > i) current = "past";
  // Create time block and append it to the outer container
  $("#time-block-container").append(
    $('<div class="row time-block"></div>')
      .attr("id", `hour-${i}`)
      .addClass(hour)
      .append(
        $('<div class="col-2 col-md-1 hour text-center py-3"></div>').text(
          i <= 12 ? `${i}AM` : `${i - 12}PM`
        )
      )
      .append(
        $('<textarea class="col-8 col-md-10 description" rows="3"> </textarea>')
      )
      .append(
        $(
          '<button class="btn saveBtn col-2 col-md-1" aria-label="save">'
        ).append($('<i class="fas fa-save" aria-hidden="true"></i>'))
      )
  );
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").click(function () {
    // Save the textarea value to local storage
    localStorage.setItem(
      $(this).parent().attr("id"),
      $(this).parent().find("textarea").val()
    );
  });

  $(".time-block").each(function () {
    // Get the time from the id
    let timeBlock = $(this).attr("id").match(/\d/g).join("");
    // Get the correct class based on the time relative to the block
    let hour = dayjs().hour();
    let newClass = "future";
    if (hour > timeBlock) newClass = "past";
    else if (hour == timeBlock) newClass = "present";
    // Add the new class to the time block
    $(this).addClass(newClass);
  });

  // Set the value of each time block's textarea to the stored description
  $(".description").each(function () {
    $(this).val(localStorage.getItem($(this).parent().attr("id")));
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Show HTML after changes have been made
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});
