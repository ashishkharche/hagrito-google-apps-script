/**
 * Formats the sheet data, excluding the header row and column.
 * Applies the border and banding, formats the 'release_date'
 * column, and autosizes the columns and rows.
 */
function formatDataset() {
  // Get the active sheet and data range.
  const id = "1zpZFQ7luyl13ElYzIXfIzYCtAiIbvi-63D5ngnpnetE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  var fullDataRange = sheet.getDataRange();

  // Apply row banding to the data, excluding the header
  // row and column. Only apply the banding if the range
  // doesn't already have banding set.
  var noHeadersRange = fullDataRange.offset(
    1,
    1,
    fullDataRange.getNumRows() - 1,
    fullDataRange.getNumColumns() - 1
  );

  if (!noHeadersRange.getBandings()[0]) {
    // The range doesn't already have banding, so it's
    // safe to apply it.
    noHeadersRange.applyRowBanding(
      SpreadsheetApp.BandingTheme.LIGHT_GREY,
      false,
      false
    );
  }

  // Call a helper function to apply date formatting
  // to the column labeled 'release_date'.
  formatDates_(columnIndexOf_("release_date"));

  // Set a border around all the data, and resize the
  // columns and rows to fit.
  fullDataRange.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    null,
    SpreadsheetApp.BorderStyle.SOLID_MEDIUM
  );

  sheet.autoResizeColumns(1, fullDataRange.getNumColumns());
  sheet.autoResizeRows(1, fullDataRange.getNumRows());
}

/**
 * Helper method that applies a
 * "Month Day, Year (Day of Week)" date format to the
 * indicated column in the active sheet.
 *
 * @param {number} colIndex The index of the column
 *   to format.
 */
function formatDates_(colIndex) {
  // Exit if the given column index is -1, indicating
  // the column to format isn't present in the sheet.
  if (colIndex < 0) return;

  // Set the date format for the date column, excluding
  // the header row.
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet
    .getRange(2, colIndex, sheet.getLastRow() - 1, 1)
    .setNumberFormat("mmmm dd, yyyy (dddd)");
}
