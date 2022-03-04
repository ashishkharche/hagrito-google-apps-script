function splitAtFirstComma() {
  // Get the active (currently highlighted) range.

  const id = "10zYM3JbN_9H3ca3V7K5vJ4nyal2vBBtizPnnKRVxSTw";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];

  var range = sheet.getRange("A2:A");

  var titleAuthorRange = range.offset(
    0,
    0,
    range.getHeight(),
    range.getWidth() + 1
  );

  // Get the current values of the selected title column cells.
  // This is a 2D array.
  var titleAuthorValues = titleAuthorRange.getValues();

  // Update values where commas are found. Assumes the presence
  // of a comma indicates an "authors, title" pattern.
  for (var row = 0; row < titleAuthorValues.length; row++) {
    var indexOfFirstComma = titleAuthorValues[row][0].indexOf(", ");

    if (indexOfFirstComma >= 0) {
      // Found a comma, so split and update the values in
      // the values array.
      var titlesAndAuthors = titleAuthorValues[row][0];

      // Update the title value in the array.
      titleAuthorValues[row][0] = titlesAndAuthors.slice(indexOfFirstComma + 2);

      // Update the author value in the array.
      titleAuthorValues[row][1] = titlesAndAuthors.slice(0, indexOfFirstComma);
    }
  }

  // Put the updated values back into the spreadsheet.
  titleAuthorRange.setValues(titleAuthorValues);
}
