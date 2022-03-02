function getMyRange() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheets()[0];
  const range = sheet.getRange(1, 4, 2, 2);
  const data = range.getValues();
  range.setValues([
    ["test1", "test2"],
    ["test3", "test4"],
  ]);
  range.setBackground("blue");
  Logger.log(data);
}
