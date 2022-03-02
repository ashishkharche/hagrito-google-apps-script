function parseXmlToSheets() {
  const id = "1qsc4a1t_pyNZSCObm9doU7_ImwaS7iRl83TCAhsCCNE";
  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  let tempArr = [];

  let url = "https://anchor.fm/s/5e032128/podcast/rss/";
  let xml = UrlFetchApp.fetch(url).getContentText();
  let document = XmlService.parse(xml);
  let root = document.getRootElement();

  let channel = root.getChild("channel");
  let items = channel.getChildren("item");
  items.forEach((item) => {
    let title = item.getChild("title").getText();
    let mp3Url = item.getChild("enclosure").getAttribute("url").getValue();
    Logger.log(mp3Url);
    tempArr.push(mp3Url);
    Logger.log(title);
    sheet.appendRow(tempArr);
    tempArr.pop(mp3Url);
  });
}
