/**
 * Reformats title and author columns by splitting the title column
 * at the last instance of the string " by ", if present.
 */
function splitAtLastBy() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];

  var activeRange = sheet.getRange("A2:A");
  var titleAuthorRange = activeRange.offset(
    0,
    0,
    activeRange.getHeight(),
    activeRange.getWidth() + 1
  );

  // Get the current values of the selected title column cells.
  // This is a 2D array.
  var titleAuthorValues = titleAuthorRange.getValues();

  // Update values where " by " substrings are found. Assumes
  // the presence of a " by " indicates a "title by authors"
  // pattern.
  for (var row = 0; row < titleAuthorValues.length; row++) {
    var indexOfLastBy = titleAuthorValues[row][0].lastIndexOf(" by ");

    if (indexOfLastBy >= 0) {
      // Found a " by ", so split and update the values in
      // the values array.
      var titlesAndAuthors = titleAuthorValues[row][0];

      Logger.log(titlesAndAuthors);
      Logger.log(row);

      // Update the title value in the array.
      titleAuthorValues[row][0] = titlesAndAuthors.slice(0, indexOfLastBy);

      // Update the author value in the array.
      titleAuthorValues[row][1] = titlesAndAuthors.slice(indexOfLastBy + 4);

      Logger.log(titleAuthorValues[row][0]);
      Logger.log(titleAuthorValues[row][1]);
      Logger.log(titleAuthorValues);
    }
  }

  // Put the updated values back into the spreadsheet.
  titleAuthorRange.setValues(titleAuthorValues);
}
