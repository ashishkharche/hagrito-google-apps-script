function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("sample")
    .addItem("run", "insertCSVdata")
    .addToUi();
}

function insertCSVdata(e) {
  if (!e) {
    const html = HtmlService.createHtmlOutput(
      `<input type="file" id="csv" value="Select CSV file" accept=".csv,text/csv" onchange="main()"><script>function main(){const file=document.getElementById("csv").files[0]; const fr=new FileReader(); fr.readAsArrayBuffer(file); fr.onload=(f)=> google.script.run.withSuccessHandler(google.script.host.close).insertCSVdata([[...new Int8Array(f.target.result)], file.name, file.type]);}</script>`
    );
    SpreadsheetApp.getUi().showModalDialog(html, "sample");
    return;
  }
  const activeRange = SpreadsheetApp.getActiveRange();
  const csv = Utilities.newBlob(...e).getDataAsString();
  const ar = Utilities.parseCsv(csv);
  const range = activeRange.offset(0, 0, ar.length, ar[0].length);
  const formats = range.getNumberFormats().map((r) => r.map((c) => c || "@"));
  range.setValues(ar).setNumberFormats(formats);
  return;
}