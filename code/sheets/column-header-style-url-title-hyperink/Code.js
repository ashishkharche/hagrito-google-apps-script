/**
 * Formats top row of sheet using our header row style.
 */
function formatRowHeader() {
  const id = "1zpZFQ7luyl13ElYzIXfIzYCtAiIbvi-63D5ngnpnetE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());

  // Apply each format to the top row: bold white text,
  // blue-green background, and a solid black border
  // around the cells.
  headerRange
    .setFontWeight("bold")
    .setFontColor("#ffffff")
    .setBackground("#007272")
    .setBorder(
      true,
      true,
      true,
      true,
      null,
      null,
      null,
      SpreadsheetApp.BorderStyle.SOLID_MEDIUM
    );
}

/**
 * Formats the column header of the active sheet.
 */
function formatColumnHeader() {
  const id = "1zpZFQ7luyl13ElYzIXfIzYCtAiIbvi-63D5ngnpnetE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];

  // Get total number of rows in data range, not including
  // the header row.
  var numRows = sheet.getDataRange().getLastRow() - 1;

  // Get the range of the column header.
  var columnHeaderRange = sheet.getRange(2, 1, numRows, 1);

  // Apply text formatting and add borders.
  columnHeaderRange
    .setFontWeight("bold")
    .setFontStyle("italic")
    .setBorder(
      true,
      true,
      true,
      true,
      null,
      null,
      null,
      SpreadsheetApp.BorderStyle.SOLID_MEDIUM
    );

  // Call helper method to hyperlink the first column contents
  // to the url column contents.
  hyperlinkColumnHeaders_(columnHeaderRange, numRows);
}

/**
 * Helper function that hyperlinks the column header with the
 * 'url' column contents. The function then removes the column.
 *
 * @param {object} headerRange The range of the column header
 *   to update.
 * @param {number} numRows The size of the column header.
 */
function hyperlinkColumnHeaders_(headerRange, numRows) {
  // Get header and url column indices.
  var headerColIndex = 1;
  var urlColIndex = columnIndexOf_("url");

  // Exit if the url column is missing.
  if (urlColIndex == -1) return;

  // Get header and url cell values.
  var urlRange = headerRange.offset(0, urlColIndex - headerColIndex);
  var headerValues = headerRange.getValues();
  var urlValues = urlRange.getValues();

  // Updates header values to the hyperlinked header values.
  for (var row = 0; row < numRows; row++) {
    headerValues[row][0] =
      '=HYPERLINK("' + urlValues[row] + '","' + headerValues[row] + '")';
  }
  headerRange.setValues(headerValues);

  // Delete the url column to clean up the sheet.

  const id = "1zpZFQ7luyl13ElYzIXfIzYCtAiIbvi-63D5ngnpnetE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];

  sheet.deleteColumn(urlColIndex);
}

/**
 * Helper function that goes through the headers of all columns
 * and returns the index of the column with the specified name
 * in row 1. If a column with that name does not exist,
 * this function returns -1. If multiple columns have the same
 * name in row 1, the index of the first one discovered is
 * returned.
 *
 * @param {string} colName The name to find in the column
 *   headers.
 * @return The index of that column in the active sheet,
 *   or -1 if the name isn't found.
 */
function columnIndexOf_(colName) {
  // Get the current column names.
  const id = "1zpZFQ7luyl13ElYzIXfIzYCtAiIbvi-63D5ngnpnetE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];

  var columnHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var columnNames = columnHeaders.getValues();

  // Loops through every column and returns the column index
  // if the row 1 value of that column matches colName.
  for (var col = 1; col <= columnNames[0].length; col++) {
    if (columnNames[0][col - 1] === colName) return col;
  }

  // Returns -1 if a column named colName does not exist.
  return -1;
}
