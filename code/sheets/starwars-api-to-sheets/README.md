# Star wars API to sheets

### `onOpen()`

Here you've added a few menu items to your `Quick formats` menu. You've set a separator line and then used the [`Menu.addSubMenu(menu)`](https://developers.google.com/apps-script/reference/base/menu#addSubMenu(Menu)) method to create a nested menu structure with three new items. The new items are added with the [`Menu.addItem(caption, functionName)`](https://developers.google.com/apps-script/reference/base/menu#additemcaption,-functionname) method.

### Wrapper functions

The added menu items are all doing something similar: they're trying to create a sheet with data pulled from [SWAPI](https://swapi.dev/). The only difference is they're each focusing on a different film.

It would be convenient to write a single function to create the sheet, and have the function accept a parameter to determine what film to use. However, the [`Menu.addItem(caption, functionName)`](https://developers.google.com/apps-script/reference/base/menu#additemcaption,-functionname) method doesn't let you pass parameters to it when called by the menu. So, how do you avoid writing the same code three times?

The answer is _wrapper functions_. These are lightweight functions you can call that immediately call another function with specific parameters set.

Here, the code uses three wrapper functions: `createPeopleSheetIV()`, `createPeopleSheetV()`, and `createPeopleSheetVI()`. The menu items are linked to these functions. When a menu item is clicked, the wrapper function executes and immediately calls the main sheet builder function `createResourceSheet_(resourceType, idNumber, episodeNumber)`, passing along the parameters appropriate for the menu item. In this case, it means asking the sheet builder function to create a sheet filled with major character data from one of the Star Wars films.

**Note**: If you want, you can create more wrapper functions to populate different types of sheets with data. You just need to know what resource type to ask for and what film ID to use. Example resource types include ‘`planets`' and ‘`starships`', and the API accepts numbers 1–7 as film IDs.

### `createResourceSheet_(<wbr>resourceType,<wbr> idNumber,<wbr> episodeNumber)`

This is the main sheet builder function for this exercise. With the assistance of some helper functions, it gets the API data, parses it, creates a sheet, writes the API data to the sheet, and then formats the sheet using the functions you constructed in the previous sections. Let's review the details:

First, the function uses `fetchApiResourceObject_(url)` to make a request of the API to retrieve basic film information. The API response includes a collection of URLs the code can use to get more details about specific people (known here as _resources_) from the films. The code collects it all in the `resourceUrls` array.

Next, the code uses `fetchApiResourceObject_(url)` repeatedly to call the API for every resource URL in `resourceUrls`. The results are stored in the `resourceDataList` array. Every element of this array is an object that describes a different character from the film.

The resource data objects have several common keys that map to information about that character. For example, the key ‘`name`' maps to the name of the character in the film. We assume the keys for each resource data object are all identical, since they're meant to use common object structures. The list of keys is needed later, so the code stores the key list in `resourceObjectKeys` using the JavaScript [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method.

Next, the builder function calls the `createNewSheet_(name)` helper function to create the sheet where the new data will be placed. Calling this helper function also activates the new sheet.

After the sheet is created, the helper function `fillSheetWithData_(resourceSheet, objectKeys, resourceDataList)` is called to add all the API data to the sheet.

Finally, all the formatting functions you built previously are called to apply the same formatting rules to the new data. Since the new sheet is the active one, the code can re-use these functions without modification.

### `fetchApiResourceObject_(<wbr>url)`

This helper function is similar to the `fetchBookData_(ISBN)` helper function used in the previous codelab [Working with data](https://codelabs.developers.google.com/codelabs/apps-script-fundamentals-3). It takes the given URL and uses the [`UrlFetchApp.fetch(url, params)`](https://developers.google.com/apps-script/reference/url-fetch/#urlfetchapp) method to get a response. The response is then parsed into a JSON object using the [`HTTPResponse.getContextText()`](https://developers.google.com/apps-script/reference/url-fetch/http-response#getcontenttext) and the JavaScript [`JSON.parse(json)`](https://www.w3schools.com/js/js_json_parse.asp) methods. The resulting JSON object is then returned.

**Note**: If you work a lot with APIs, this function can be handy when you need to retrieve API information. It's generalized to work with almost any API URL, so consider saving it for future use.

### `createNewSheet_(<wbr>name)`

This helper function is fairly simple. It first verifies if a sheet of the given name exists in the spreadsheet. If it does, the function activates the sheet and returns it.

If the sheet doesn't exist, the function creates it with [`Spreadsheet.insertSheet(sheetName)`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#insertsheetsheetname), activates it, and returns the new sheet.

### `fillSheetWithData_(<wbr>resourceSheet,<wbr> objectKeys,<wbr> resourceDataList)`

This helper function is responsible for filling the new sheet with API data. It takes as parameters the new sheet, the list of object keys, and the list of API resource objects as parameters. Each object key represents a column in the new sheet, and each resource object represents a row.

First, the function calculates the number of rows and columns needed to present the new API data. This is the size of the resource and keys list, respectively. The function then defines an output range (`resourceRange`) where the data will be placed, adding an extra row to hold the column headers. The variable `resourceValues` holds a 2D values array extracted from `resourceRange`.

The function then loops over every object key in the `objectKeys` list. The key is set as the column header, and then a second loop goes through every resource object. For each (row, column) pair, the corresponding API information is copied to the `resourceValues[row][column]` element.

**Note**: Remember that rows and columns in Sheets are 1-indexed, while JavaScript arrays are 0-indexed. Because of this difference, we often have to add or subtract 1 from indices when programming in Apps Script.

After `resourceValues` is filled, the destination sheet is cleared using [`Sheet.clear()`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#clear) in case it contains data from previous menu item clicks. Finally, the new values are written to the sheet.

## References

[Fundamentals of Apps Script with Google Sheets #4: Data Formatting](https://developers.google.com/codelabs/apps-script-fundamentals-4#6)