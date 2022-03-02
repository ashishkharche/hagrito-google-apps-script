function myFunctionPrint() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange(1, 1, 3, 3);
  var values = range.getValues();

  // Print values from a 3x3 box.
  for (var row in values) {
    for (var col in values[row]) {
      Logger.log(values[row][col]);
    }
  }
}
