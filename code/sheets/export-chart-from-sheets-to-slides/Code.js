/**
 * Create a Slides presentation and export
 * all the embedded charts in this spreadsheet
 * to it, one chart per slide.
 */
function exportChartsToSlides() {
  const id = "1uGmuZfb3fUtr5QiQgEPQ3RaPGnTJmu4cQjltEDcyeOg";
  const ss = SpreadsheetApp.openById(id);
  // Fetch a list of all embedded charts in this
  // spreadsheet.
  var charts = [];
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    charts = charts.concat(sheets[i].getCharts());
  }

  // If there aren't any charts, display a toast
  // message and return without doing anything
  // else.
  if (charts.length == 0) {
    ss.toast("No charts to export!");
    return;
  }

  // Create a Slides presentation, removing the default
  // title slide.
  var presentationTitle = ss.getName() + " Presentation";
  var slides = SlidesApp.create(presentationTitle);
  slides.getSlides()[0].remove();

  // Add charts to the presentation, one chart per slide.
  var position = { left: 40, top: 30 };
  var size = { height: 340, width: 430 };
  for (var i = 0; i < charts.length; i++) {
    var newSlide = slides.appendSlide();
    newSlide.insertSheetsChart(
      charts[i],
      position.left,
      position.top,
      size.width,
      size.height
    );
  }

  // Create and display a dialog telling the user where to
  // find the new presentation.
  var slidesUrl = slides.getUrl();
  var html =
    "<p>Find it in your home Drive folder:</p>" +
    '<p><a href="' +
    slidesUrl +
    '" target="_blank">' +
    presentationTitle +
    "</a></p>";

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setHeight(120).setWidth(350),
    "Created a presentation!"
  );
}
