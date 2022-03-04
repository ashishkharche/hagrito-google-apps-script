# Fetch external data with UrlFetch using Openlibrary API

### **1: The API request**

In the first two lines, `fetchBookData_(ISBN)` connects to the public Open Library API using the API's URL endpoint and Apps Script's [URL Fetch Service](https://developers.google.com/apps-script/reference/url-fetch/).

The `url` variable is just a URL string, like a web address. It points to a location on the Open Library servers. It also includes three _parameters_ (`bibkeys`, `jscmd`, and `format`) that tell the Open Library servers what information you're requesting and how to structure the response. In this case, you provide the book's ISBN number and ask for detailed information to be returned in JSON format.

**Note:** Each public API defines its own formats for making requests and returning results. For your code to communicate effectively with an API, you must adhere to the formats it defines. For the Open Library, the request and response formats are described in the [Open Library Books API documentation](https://openlibrary.org/dev/docs/api/books). The response format used is [_JSON_](https://www.json.org/) (JavaScript Object Notation), which is just a particular way of organizing data. JSON is similar to HTML or XML, but tends to be easier for humans to read.

Once you've built the URL string, the code sends a request to the location and receives a response. This is done with the [`UrlFetchApp.fetch(url, params)`](https://developers.google.com/apps-script/reference/url-fetch/#urlfetchapp) method. It sends an information request to the external URL you provide and stores the resulting response in the `response` variable. In addition to the URL, the code sets the optional parameter [`muteHttpExceptions`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl-params) to `true`. This setting means your code won't halt if the request results in an API error. Instead, the error response is returned.

The request returns an [`HTTPResponse`](https://developers.google.com/apps-script/reference/url-fetch/http-response) object that's stored in the `response` variable. HTTP responses include a response code, HTTP headers, and the main response content. The information of interest here's the main JSON content, so the code must extract that and then parse the JSON to locate and return the desired information.

### **2: Parse the API response and return the information of interest**

In the last three lines of code, the [`HTTPResponse.getContentText()`](https://developers.google.com/apps-script/reference/url-fetch/http-response#getContentText()) method returns the main content of the response as a string. This string is in JSON format, but the Open Library API defines the exact content and format. The [`JSON.parse(jsonString)`](https://www.w3schools.com/js/js_json_parse.asp) method converts the JSON string to a JavaScript object so different parts of the data can be easily extracted. Finally, the function returns the data corresponding to the book's ISBN number.

## References

[Fundamentals of Apps Script with Google Sheets #3: Working with Data](https://developers.google.com/codelabs/apps-script-fundamentals-3#10)