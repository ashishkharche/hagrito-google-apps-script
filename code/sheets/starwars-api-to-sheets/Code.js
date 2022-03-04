/**
 * Wrapper function that passes arguments to create a
 * resource sheet describing the characters from Episode IV.
 */
function createPeopleSheetIV() {
  createResourceSheet_("characters", 1, "IV");
}

/**
 * Wrapper function that passes arguments to create a
 * resource sheet describing the characters from Episode V.
 */
function createPeopleSheetV() {
  createResourceSheet_("characters", 2, "V");
}

/**
 * Wrapper function that passes arguments to create a
 * resource sheet describing the characters from Episode VI.
 */
function createPeopleSheetVI() {
  createResourceSheet_("characters", 3, "VI");
}

/**
 * Creates a formatted sheet filled with user-specified
 * information from the Star Wars API. If the sheet with
 * this data exists, the sheet is overwritten with the API
 * information.
 *
 * @param {string} resourceType The type of resource.
 * @param {number} idNumber The identification number of the film.
 * @param {number} episodeNumber The Star Wars film episode number.
 *   This is only used in the sheet name.
 */
function createResourceSheet_(resourceType, idNumber, episodeNumber) {
  // Fetch the basic film data from the API.
  var filmData = fetchApiResourceObject_(
    "https://swapi.dev/api/films/" + idNumber
  );

  // Extract the API URLs for each resource so the code can
  // call the API to get more data about each individually.
  var resourceUrls = filmData[resourceType];

  // Fetch each resource from the API individually and push
  // them into a new object list.
  var resourceDataList = [];
  for (var i = 0; i < resourceUrls.length; i++) {
    resourceDataList.push(fetchApiResourceObject_(resourceUrls[i]));
  }

  // Get the keys used to reference each part of data within
  // the resources. The keys are assumed to be identical for
  // each object since they're all the same resource type.
  var resourceObjectKeys = Object.keys(resourceDataList[0]);

  // Create the sheet with the appropriate name. It
  // automatically becomes the active sheet when it's created.
  var resourceSheet = createNewSheet_(
    "Episode " + episodeNumber + " " + resourceType
  );

  // Add the API data to the new sheet, using each object
  // key as a column header.
  fillSheetWithData_(resourceSheet, resourceObjectKeys, resourceDataList);

  // Format the new sheet using the same styles the
  // 'Quick Formats' menu items apply. These methods all
  // act on the active sheet, which is the one just created.
  formatRowHeader();
  formatColumnHeader();
  formatDataset();
}

/**
 * Helper function that retrieves a JSON object containing a
 * response from a public API.
 *
 * @param {string} url The URL of the API object being fetched.
 * @return {object} resourceObject The JSON object fetched
 *   from the URL request to the API.
 */
function fetchApiResourceObject_(url) {
  // Make request to API and get response.
  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  // Parse and return the response as a JSON object.
  var json = response.getContentText();
  var responseObject = JSON.parse(json);
  return responseObject;
}

/**
 * Helper function that creates a sheet or returns an existing
 * sheet with the same name.
 *
 * @param {string} name The name of the sheet.
 * @return {object} The created or existing sheet
 *   of the same name. This sheet becomes active.
 */
function createNewSheet_(name) {
  const id = "1X88o8zbmEhc2XmXz6Qern1GEmKX_kjU10WYeK4W2LTk";
  const ss = SpreadsheetApp.openById(id);
  // Returns an existing sheet if it has the specified
  // name. Activates the sheet before returning.
  var sheet = ss.getSheetByName(name);
  if (sheet) {
    return sheet.activate();
  }

  // Otherwise it makes a sheet, set its name, and returns it.
  // New sheets created this way automatically become the active
  // sheet.
  sheet = ss.insertSheet(name);
  return sheet;
}

/**
 * Helper function that adds API data to the sheet.
 * Each object key is used as a column header in the new sheet.
 *
 * @param {object} resourceSheet The sheet object being modified.
 * @param {object} objectKeys The list of keys for the resources.
 * @param {object} resourceDataList The list of API
 *   resource objects containing data to add to the sheet.
 */
function fillSheetWithData_(resourceSheet, objectKeys, resourceDataList) {
  // Set the dimensions of the data range being added to the sheet.
  var numRows = resourceDataList.length;
  var numColumns = objectKeys.length;

  // Get the resource range and associated values array. Add an
  // extra row for the column headers.
  var resourceRange = resourceSheet.getRange(1, 1, numRows + 1, numColumns);
  var resourceValues = resourceRange.getValues();

  // Loop over each key value and resource, extracting data to
  // place in the 2D resourceValues array.
  for (var column = 0; column < numColumns; column++) {
    // Set the column header.
    var columnHeader = objectKeys[column];
    resourceValues[0][column] = columnHeader;

    // Read and set each row in this column.
    for (var row = 1; row < numRows + 1; row++) {
      var resource = resourceDataList[row - 1];
      var value = resource[columnHeader];
      resourceValues[row][column] = value;
    }
  }

  // Remove any existing data in the sheet and set the new values.
  resourceSheet.clear();
  resourceRange.setValues(resourceValues);
}
