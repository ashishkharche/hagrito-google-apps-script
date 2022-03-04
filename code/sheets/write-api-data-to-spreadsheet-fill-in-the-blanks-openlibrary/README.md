# Write API data to a spreadsheet - fill in the blanks - Open library API

### **1: Read the existing book information**

The first three lines of the function define constants to help make the code more readable. In the next two lines, the `bookValues` variable is used to maintain a local copy of the sheet's book information. The code will read information from `bookValues`, use the API to fill in missing information, and write these values back to the spreadsheet.

**Note**: This arrangement is different from `splitAtFirstComma()` and `splitAtLastBy()`. In those functions, the code only examined the currently highlighted titles and their rows. Here, you're examining the entire sheet using [`Spreadsheet.getDataRange()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getdatarange).

### **2: Fetch missing information using the helper function**

The code loops over each row in `bookValues` to find missing titles or authors. To reduce the number of API calls while improving efficiency, the code only calls the API if the following are true:

1.  The row's ISBN column has a value.
2.  Either the title or author cell in the row is empty.

If the conditions are true, the code calls the API using the `fetchBookData_(isbn)` helper function you implemented previously, and stores the result in the `bookData` variable. It should now have the missing information you want to insert into the sheet.

The only task left is to add the `bookData` information to our spreadsheet. However, there's a caveat. Unfortunately, public APIs like the Open Library Book API sometimes don't have the information you request, or occasionally might have some other issue preventing it from providing the information. If you assume every API request will succeed, your code won't be robust enough to handle unexpected errors.

To make sure your code can handle API errors, the code must check the API response is valid before attempting to use it. Once the code has `bookData`, it conducts a simple check to verify `bookData` and `bookData.details` exist before attempting to read from them. If either is missing, it means the API didn't have the data you wanted. In this case, the `continue` command tells the code to skip that row—you can't fill in the missing cells, but at least your script won't crash.

### **3: Write updated information back into the sheet**

The last part of the code has similar checks to verify the API returned title and author information. The code only updates the `bookValues` array if the original title or author cell is empty and the API returned a value you can place there.

The loop exits after all rows in the sheet are examined. The last step is to write the now-updated `bookValues` array back to the spreadsheet using [`Range.setValues(values)`](https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues).

## References

[Fundamentals of Apps Script with Google Sheets #3: Working with Data](https://developers.google.com/codelabs/apps-script-fundamentals-3#11)