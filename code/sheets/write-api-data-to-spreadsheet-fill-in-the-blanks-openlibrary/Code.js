/**
 * Helper function to retrieve book data from the Open Library
 * public API.
 *
 * @param {number} ISBN - The ISBN number of the book to find.
 * @return {object} The book's data, in JSON format.
 */
function fetchBookData_(ISBN) {
  // Connect to the public API.
  var url =
    "https://openlibrary.org/api/books?bibkeys=ISBN:" +
    ISBN +
    "&jscmd=details&format=json";
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  // Make request to API and get response before this point.
  var json = response.getContentText();
  var bookData = JSON.parse(json);

  // Return only the data we're interested in.
  Logger.log(bookData["ISBN:" + ISBN]);
  return bookData["ISBN:" + ISBN];
}

/**
 * Fills in missing title and author data using Open Library API
 * calls.
 */
function fillInTheBlanks() {
  // Constants that identify the index of the title, author,
  // and ISBN columns (in the 2D bookValues array below).
  var TITLE_COLUMN = 0;
  var AUTHOR_COLUMN = 1;
  var ISBN_COLUMN = 2;

  // Get the existing book information in the active sheet. The data
  // is placed into a 2D array.

  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  var dataRange = ss.getDataRange();
  var bookValues = dataRange.getValues();
  Logger.log(bookValues);

  // Examine each row of the data (excluding the header row).
  // If an ISBN is present, and a title or author is missing,
  // use the fetchBookData_(isbn) method to retrieve the
  // missing data from the Open Library API. Fill in the
  // missing titles or authors when they're found.
  for (var row = 1; row < bookValues.length; row++) {
    var isbn = bookValues[row][ISBN_COLUMN];
    var title = bookValues[row][TITLE_COLUMN];
    var author = bookValues[row][AUTHOR_COLUMN];

    if (isbn != "" && (title === "" || author === "")) {
      // Only call the API if you have an ISBN number and
      // either the title or author is missing.
      var bookData = fetchBookData_(isbn);

      // Sometimes the API doesn't return the information needed.
      // In those cases, don't attempt to update the row.
      if (!bookData || !bookData.details) {
        continue;
      }

      // The API might not return a title, so only fill it in
      // if the response has one and if the title is blank in
      // the sheet.
      if (title === "" && bookData.details.title) {
        bookValues[row][TITLE_COLUMN] = bookData.details.title;
      }

      // The API might not return an author name, so only fill it in
      // if the response has one and if the author is blank in
      // the sheet.
      if (
        author === "" &&
        bookData.details.authors &&
        bookData.details.authors[0].name
      ) {
        bookValues[row][AUTHOR_COLUMN] = bookData.details.authors[0].name;
      }
    }
  }

  // Insert the updated book data values into the spreadsheet.
  dataRange.setValues(bookValues);
}
