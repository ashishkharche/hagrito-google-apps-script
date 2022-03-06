function parseXmlToSheets() {
  const id = "1Ypso1cylYhbjfUJwTCRlUebWQGKGkXr-nQ1K1bpz8CI";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  let arr1 = [];
  let arr2 = [];

  let url = "https://anchor.fm/s/5e032128/podcast/rss/";
  let xml = UrlFetchApp.fetch(url).getContentText();
  let document = XmlService.parse(xml);
  let root = document.getRootElement();

  let channel = root.getChild("channel");
  let items = channel.getChildren("item");

  Logger.log("channel");
  Logger.log(channel);
  Logger.log("items");
  Logger.log(items);
  Logger.log("items.length");
  Logger.log(items.length);

  let numRows = items.length;
  let numColumns = 1;

  var range = sheet.getRange(1, 1, numRows, numColumns);

  items.forEach((item) => {
    let mp3Url = item.getChild("enclosure").getAttribute("url").getValue();
    Logger.log("mp3Url");
    Logger.log(mp3Url);

    arr1 = arr1.concat(mp3Url);
    arr2 = arr1.map(function (input) {
      return [input];
    });
  });

  Logger.log("arr2");
  Logger.log(arr2);

  range.setValues(arr2);
  sheet.autoResizeColumns(1, numColumns);
}
