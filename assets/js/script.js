// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").click(function () {
    // Get the id of the parent element
    let parentId = $(this).parent().attr("id");
    // Get the description from the sibling textarea
    let description = $(this).parent().find("textarea").val();
    // Save the description to localStorage with the parent id as the key
    localStorage.setItem(parentId, description);
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
});
