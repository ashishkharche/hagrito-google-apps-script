/**
 * Helper function to retrieve book data from the Open Library
 * public API.
 *
 * @param {number} ISBN - The ISBN number of the book to find.
 * @return {object} The book's data, in JSON format.
 */
function fetchBookData() {
  ISBN = "978-0316017930";
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
  Logger.log(bookData);
  return bookData["ISBN:" + ISBN];
}
