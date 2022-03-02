function makeNewOne() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  const sheets = ss.getSheets();
  Logger.log(sheets);
  const newName = "Sheet New";
  let sheet = ss.getSheetByName(newName);
  if (sheet == null) {
    sheet = ss.insertSheet();
    sheet.setName(newName);
  }
  Logger.log(sheet.getIndex());
}
