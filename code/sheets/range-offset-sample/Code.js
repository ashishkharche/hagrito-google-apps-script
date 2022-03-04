function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var cell = sheet.getRange("A1");

  // newCell references B4:C7
  var newRange = cell.offset(3, 1, 4, 2);
  Logger.log(newRange.getValues());
}
