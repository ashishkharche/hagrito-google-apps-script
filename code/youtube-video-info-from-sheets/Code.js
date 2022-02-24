function getVideoInfo() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var vid   = sheet.getRange("A2").getValue();
    var data  = YouTube.Videos.list('snippet, statistics', {id: vid});
    var item  = data.items[0];
    var info  = [item.snippet.title, item.statistics.viewCount];
    sheet.getRange("B2:C2").setValues([info]);
}