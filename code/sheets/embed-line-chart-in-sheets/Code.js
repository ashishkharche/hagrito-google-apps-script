/**
 * Creates and inserts an embedded
 * line chart into the active sheet.
 */
function createEmbeddedLineChart() {
  const id = "1uGmuZfb3fUtr5QiQgEPQ3RaPGnTJmu4cQjltEDcyeOg";

  const ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheets()[0];
  var chartDataRange = sheet.getRange(
    "Dates and USD Exchange Rates dataset!A2:F102"
  );
  var hAxisOptions = {
    slantedText: true,
    slantedTextAngle: 60,
    gridlines: {
      count: 12,
    },
  };

  var lineChartBuilder = sheet.newChart().asLineChart();
  var chart = lineChartBuilder
    .addRange(chartDataRange)
    .setPosition(5, 8, 0, 0)
    .setTitle("USD Exchange rates")
    .setNumHeaders(1)
    .setLegendPosition(Charts.Position.RIGHT)
    .setOption("hAxis", hAxisOptions)
    .setOption("useFirstColumnAsDomain", true)
    .build();

  sheet.insertChart(chart);
}
