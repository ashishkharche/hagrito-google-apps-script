# Column header style - url title hyperlink

### `formatColumnHeader()`

As you've probably come to expect, the first few lines of this function set variables that reference the sheet and range we're interested in:

- The active sheet is stored in `sheet`.
- The number of rows in the column header is calculated and saved in `numRows`. Here the code subtracts one so the row count doesn't include the column header: `title`.
- The range covering the column header is stored in `columnHeaderRange`.

The code then applies the borders and bolding to the column header range, just like in `formatRowHeader()`. Here, [`Range.setFontStyle(fontStyle)`](https://developers.google.com/apps-script/reference/spreadsheet/range#setfontstylefontstyle) is also used to make the text italicized.

Adding the hyperlinks to the header column is more complex, so `formatColumnHeader()` calls `hyperlinkColumnHeaders_(headerRange, numRows)` to take care of the task. This helps keep the code tidy and readable.

### `hyperlinkColumnHeaders_(<wbr>headerRange,<wbr> numRows)`

This helper function first identifies the column indices of the header (assumed to be index 1) and the `url` column. It calls `columnIndexOf_('url')` to get the url column index. If a `url` column isn't found, the method exits without modifying any data.

The function gets a new range (`urlRange`) that covers the urls corresponding to the header column rows. This is done with the [`Range.offset(rowOffset, columnOffset)`](https://developers.google.com/apps-script/reference/spreadsheet/range#offsetrowoffset,-columnoffset) method, which guarantees the two ranges will be the same size. The values in both the `headerColumn` and the `url` column are then retrieved (`headerValues` and `urlValues`).

The function then loops over each column header cell value and replaces it with a `=HYPERLINK()` Sheets formula constructed with the header and `url` column contents. The modified header values are then inserted into the sheet using [`Range.setValues(values)`](https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues).

Finally, to help keep the sheet clean and to eliminate redundant information, [`Sheet.deleteColumn(columnPosition)`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#deletecolumncolumnposition) is called to remove the `url` column.

### `columnIndexOf_(<wbr>colName)`

This helper function is just a simple utility function that searches the first row of the sheet for a specific name. The first three lines use methods you've already seen to get a list of column header names from row 1 of the spreadsheet. These names are stored in the variable columnNames.

The function then reviews each name in order. If it finds one that matches the name being searched for, it stops and returns the column's index. If it reaches the end of the name list without finding the name, it returns -1 to signal the name wasn't found.

## References

[Fundamentals of Apps Script with Google Sheets #4: Data Formatting](https://developers.google.com/codelabs/apps-script-fundamentals-4#4)
