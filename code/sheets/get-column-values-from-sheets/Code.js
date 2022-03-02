function myFunction() {
    var spreadsheet = SpreadsheetApp.openById("1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE");
  
    const data = spreadsheet.getDataRange();
  
    const values = data.getValues();
  
    const rowA1toB1 = spreadsheet.getRange("A1:B1").getValues();
  
    const columnA1toA5 = spreadsheet.getRange("A1:A5").getValues();
  
    const rectangle = spreadsheet.getRange("A1:B5").getValues();
  
    Logger.log(`rowA1toB1: ${rowA1toB1}`)
    Logger.log(`columnA1toA5: ${columnA1toA5}`)
    Logger.log(`rectangle: ${rectangle}`)
  
    Logger.log(`data: ${data}`)
  
    // get all values
    Logger.log(`values: ${values}`)
  
    // get value at row 0 and column 1
    Logger.log(`values[0][1]: ${values[0][1]}`);
    values.forEach((val) => {
  
      // loop and print all values array format
      Logger.log(`val: ${val}`)
  
      // loop and print only values in row 0
      Logger.log(`val[1]: ${val[1]}`)
    })
  }