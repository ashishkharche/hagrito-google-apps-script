# Format dataset - banding, dates - except header and footer

## `formatDataset()`

This function follows a similar pattern to the previous format functions you've already implemented. First, it gets variables to hold references to the active sheet (sheet) and the data range (fullDataRange).

Second, it uses the [`Range.offset(rowOffset, columnOffset, numRows, numColumns)`](https://developers.google.com/apps-script/reference/spreadsheet/range#offsetrowoffset,-columnoffset,-numrows,-numcolumns) method to create a range (`noHeadersRange`) that covers all the data in the sheet, excluding the column and row headers. The code then verifies if this new range has existing banding (using [`Range.getBandings()`](https://developers.google.com/apps-script/reference/spreadsheet/range#getbandings)). This is necessary because Apps Script throws an error if you try to apply new banding where one exists. If banding doesn't exist, the function adds a light gray banding using [`Range.applyRowBanding(bandingTheme, showHeader, showFooter)`](https://developers.google.com/apps-script/reference/spreadsheet/range#applyrowbandingbandingtheme,-showheader,-showfooter). Otherwise, the function moves on.

The next step calls the `formatDates_(colIndex)` helper function to format the dates in the column labeled ‘`release_date`' (described below). The column is specified using the `columnIndexOf_(colName)` helper function you implemented earlier.

Finally, the formatting is finished by adding another border (as before), and automatically resizes every column and row to fit the data they contain using the [`Sheet.autoResizeColumns(columnPosition)`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#autoresizecolumncolumnposition) and [`Sheet.autoResizeColumns(columnPosition)`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#autoresizerowcolumnposition) methods.

## `formatDates_(<wbr>colIndex)`

This helper function applies a specific date format to a column using the provided column index. Specifically, it formats date values as "Month Day, Year (Day of Week)".

**Note**: There's many different date and number formats you can use in your scripts and spreadsheets. For more information, review the [Date and Number Formats](https://developers.google.com/sheets/api/guides/formats) guide.

First, the function verifies the provided column index is valid (that is, 0 or greater). If not, it returns without doing anything. This check prevents errors that might be caused if, for example, the sheet didn't have a ‘`release_date`' column.

Once the column index is validated, the function gets the range covering that column (excluding its header row) and uses [`Range.setNumberFormat(numberFormat)`](https://developers.google.com/apps-script/reference/spreadsheet/range#setnumberformatnumberformat) to apply the formatting.

## References

[Fundamentals of Apps Script with Google Sheets #4: Data Formatting](https://developers.google.com/codelabs/apps-script-fundamentals-4#5)