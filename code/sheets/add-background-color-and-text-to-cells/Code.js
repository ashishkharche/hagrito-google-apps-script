function addColors2() {
  const id = "1looDMwg_ztAb2tiuRx6Xk3MXFtQ4yLc1vumVbiSnzu0";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheets()[0];
  let backColor = "red";
  let mySize = 10;
  for (let rows = 1; rows < 51; rows++) {
    for (let cols = 1; cols < 11; cols++) {
      let total = rows + cols;
      if (total % 2 == 0) {
        backColor = "red";
      } else {
        backColor = "pink";
      }
      let range = sheet.getRange(rows, cols);
      range.setBackground(backColor);
      range.setFontColor("white");
      range.setFontSize(mySize + cols);
      range.setValue(total);
    }
  }
}
