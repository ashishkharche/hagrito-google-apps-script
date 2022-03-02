function copyMe() {
    const id = '1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE';
    const ss = SpreadsheetApp.openById(id);
    var sheet = ss.getSheets()[0];
  
    // what is selected
    const range = sheet.getRange(2, 1);
    const data = range.getValues();
    createASheet(data, ss, range);
    range.setBackground('red');
  }
  
  function createASheet(data, ss, range) {
    const numSheets = ss.getSheets();
    const sheetName = 'Sheet ' + numSheets.length;
    let newSheet = ss.getSheetByName(sheetName);
    if (newSheet == null) {
      newSheet = ss.insertSheet();
      newSheet.setName(sheetName);
    } else {
      //newSheet.clearContents();
      //newSheet.clearFormats();
      newSheet.clear();
    }
    // where the selected is copied
    const newRange = newSheet.getRange(3, 1);
    Logger.log(range.getNumRows())
    newRange.setValues(data);
  }
  