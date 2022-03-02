function addContent() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheets()[0];
  Logger.log(sheet);
  let startPos = 8;
  let startVal = sheet.getRange(startPos, 1).getValue();
  sheet.getRange(startPos, 1).setValue(startVal + " START");
  sheet.insertRowAfter(startPos);
  sheet.getRange(startPos + 1, 1).setValue("AFTER");
  sheet.insertRowBefore(startPos);
  sheet.getRange(startPos, 1).setValue("BEFORE");
  let tempArr = [sheet.getLastRow() + 1, "test", 2, "hello world"];
  sheet.appendRow(tempArr);
}
