function UntitledMacro() {
  var spreadsheet = SpreadsheetApp.openById(
    "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE"
  );
  spreadsheet.getRange("B5").activate();
  spreadsheet.getCurrentCell().setValue("sdfsdf");
  spreadsheet.getRange("D5").activate();
  spreadsheet.getCurrentCell().setValue("sdf");
  spreadsheet.getRange("C9").activate();
  spreadsheet.getCurrentCell().setValue("wer");
  spreadsheet.getRange("C3").activate();
  spreadsheet.getCurrentCell().setValue("234");
  spreadsheet.getRange("E10").activate();
  spreadsheet.getActiveRangeList().setFontSize(18);
  spreadsheet.getRange("C9").activate();
  spreadsheet.getActiveRangeList().setFontSize(18).setFontFamily("Comfortaa");
  spreadsheet.getRange("D13").activate();
}
