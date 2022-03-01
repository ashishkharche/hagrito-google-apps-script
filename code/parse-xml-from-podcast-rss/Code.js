function myFunction() {

    let url = 'https://anchor.fm/s/5e032128/podcast/rss/';
    let xml = UrlFetchApp.fetch(url).getContentText();
    let document = XmlService.parse(xml);
    let root = document.getRootElement();
  
    Logger.log(root)
  
    let channel = root.getChild('channel');
    Logger.log(channel)
  
    let items = channel.getChildren('item');
    Logger.log(items)
  
    items.forEach(item => {
      let title = item.getChild('title').getText();
      let mp3Url = item.getChild('enclosure').getAttribute('url').getValue();
      Logger.log(mp3Url)
      Logger.log(title)
    });
  }
  