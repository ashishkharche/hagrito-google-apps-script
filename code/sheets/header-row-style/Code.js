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
