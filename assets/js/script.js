// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").click(function () {
    let parentId = $(this).parent().attr("id");
    let description = $(this).parent().find("textarea").val();
    localStorage.setItem(parentId, description);
  });

  $(".time-block").each(function () {
    $(this).removeClass($(this).attr("class").split(" ").pop());

    let timeBlock = $(this).attr("id").match(/\d/g).join("");
    let newClass;
    let currentHour = dayjs().hour();

    if (currentHour > timeBlock) {
      newClass = "past";
    } else if (currentHour == timeBlock) {
      newClass = "present";
    } else {
      newClass = "future";
    }

    $(this).addClass(newClass);
  });

  $(".description").each(function () {
    $(this).val(localStorage.getItem($(this).parent().attr("id")));
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
