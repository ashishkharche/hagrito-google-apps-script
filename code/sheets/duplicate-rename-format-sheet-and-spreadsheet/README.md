# Duplicate Rename Format Sheet and Spreadsheet

The script renames Spreadsheet.

It duplicates, renames and formats sheet.

The code you added uses [`autoResizeColumns(startColumn, numColumns)`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#autoResizeColumns(Integer,Integer)) to resize the columns of the sheet for readability. The [`setFrozenRows(rows)`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#setfrozenrowsrows) method freezes the given number of rows (two, in this case) which keeps the header rows visible as the reader scrolls down the spreadsheet.

## References

[Fundamentals of Apps Script with Google Sheets #2: Spreadsheets, Sheets, and Ranges](https://developers.google.com/codelabs/apps-script-fundamentals-2#4)