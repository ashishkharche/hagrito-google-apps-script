function prepender(val, sheet) {
  sheet.insertRowBefore(1);
  let cloneArr = val.map((x) => x);
  cloneArr.push("START");
  const range = sheet.getRange(1, 1, 1, cloneArr.length);
  range.setValues([cloneArr]);
}

function addContent2() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  let tempArr = [sheet.getLastRow() + 1, "NEW CONTENT"];
  prepender(tempArr, sheet);
  tempArr.push("END");
  sheet.appendRow(tempArr);
}
