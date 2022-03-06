# Export charts from sheets to slides

### **1: Get the charts**

The first few lines search the active spreadsheet to find all the embedded charts, collecting them into the array `charts`. These lines use the [`Spreadsheet.getSheets()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getsheets) method and the [`Sheet.getCharts()`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getcharts) method to get lists of sheets and charts. The JavaScript [`Array.concat()`](https://www.w3schools.com/jsref/jsref_concat_array.asp) method is used to append the list of charts from each sheet into `charts`.

### **2: Check there are charts to export**

The code verifies if there are any charts to export. We want to avoid making a blank presentation, so if there are no charts the code instead creates a **_toast message_** using [`Spreadsheet.toast(message)`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#toastmsg). This is a small ‘peek' dialog that pops up in the lower-right corner of Sheets, stays for a few seconds, and then disappears:

### **3: Create a presentation**

The variable `presentationTitle` is created to hold the new presentation's file name. It's set as the spreadsheet's name, with " `Presentation`" concatenated on the end. The code then calls the Slides service method [`SlidesApp.create(name)`](https://developers.google.com/apps-script/reference/slides/slides-app#createname) to create a presentation.

**Note:** The [`SlidesApp`](https://developers.google.com/apps-script/reference/slides/slides-app) class acts as the parent class for the Slides service, much like [`SpreadsheetApp`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app) is the parent class for the Spreadsheet service.

New presentations are created with a single, blank slide. We don't want that in our presentation, so the code removes it with [`Presentation.getSlides()`](https://developers.google.com/apps-script/reference/slides/presentation#getslides) and [`Slide.remove()`](https://developers.google.com/apps-script/reference/slides/slide#remove).

### **4: Export the charts**

In the next section, the code defines the `position` and `size` of the JavaScript objects to set where the imported charts are placed in the slide and how large the chart will be (in pixels).

**Note:** Slides page elements like imported charts, text boxes, and shapes require specified positions and sizes. You can learn more about how Apps Script sets these values in the [Sizing and positioning page elements](https://developers.google.com/apps-script/guides/slides/moving-elements) guide.

The code loops over every chart in the charts list. For each chart, a `newSlide` is created with [`Presentation.appendSlide()`](https://developers.google.com/apps-script/reference/slides/presentation#appendslide), adding the slide to the end of the presentation. The [`Slide.insertSheetsChart(sourceChart, left, top, width, height)`](https://developers.google.com/apps-script/reference/slides/slide#insertsheetschartsourcechart,-left,-top,-width,-height) method is used to import the chart into the slide with the specified `position` and `size`.

### **5: Share the presentation location**

Finally, the code needs to tell the user where the new presentation is located, preferably with a link they can click to open it. To do this, the code uses Apps Script's [**`HTML`** **service**](https://developers.google.com/apps-script/reference/html) to create a [custom modal dialog](https://developers.google.com/apps-script/guides/dialogs#custom_dialogs). Modal dialogs (also known as _custom dialogs_ in Apps Script) are windows that appear over the Sheets interface. When displayed, custom dialogs prevent the user from interacting with Sheets.

**Key point:** Modal dialogs are great for when your script needs to have specific input from the user to proceed, or when you want to make sure the user sees something before they continue working in Google Sheets.

Apps Script's HTML service allows you to completely control the style and contents of custom dialogs with standard HTML and JavaScript. This means you can add text, buttons, images, and other interactivity to the dialog. These topics are out-of-scope for this codelab, but if you want to learn more, you can go to the [Create and Serve HTML](https://developers.google.com/apps-script/guides/html) and [Server-client communication](https://developers.google.com/apps-script/guides/html/communication) guides.

To create a custom dialog, the code needs the HTML that defines its contents. This is provided in the `html` variable. The contents include a short paragraph and a hyperlink. The hyperlink is the `presentationTitle` variable, linked to the presentation URL provided by `Presentation.getUrl()`. The hyperlink also uses the `target="_blank"` attribute so the presentation is opened in a new browser tab, rather than within the dialog.

The HTML is parsed into an [`HtmlOutput`](https://developers.google.com/apps-script/reference/html/html-output) object by the [`HtmlService.createHtmlOutput(html)`](https://developers.google.com/apps-script/reference/html/html-service#createhtmloutputhtml) method. The `HtmlOutput` object allows the code to set the size of the custom dialog with [`HtmlOutput.setHeight(height)`](https://developers.google.com/apps-script/reference/html/html-output#setheightheight) and [`HtmlOutput.setWidth(width)`](https://developers.google.com/apps-script/reference/html/html-output#setwidthwidth).

Once `htmlOutput` is created, the code uses the [`Ui.showModalDialog(htmlOutput, title)`](https://developers.google.com/apps-script/reference/base/ui#showmodaldialoguserinterface,-title) method to display the dialog with the given title.

## References

[Fundamentals of Apps Script with Google Sheets #5: Chart and Present Data in Slides](https://developers.google.com/codelabs/apps-script-fundamentals-5#3)