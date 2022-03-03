function USDTOCHF(dollars) {
  // Gets a cache that is common to all users of the script.
  var cache = CacheService.getScriptCache();

  // Accesses the memory location (rates.CHF) of the script cache.
  var rate = cache.get("rates.CHF");

  // If a cache miss occurs, the program fetches the current
  // CHF rate from an API and stores the rate in the cache
  // for later convenience.
  if (!rate) {
    var response = UrlFetchApp.fetch(
      "https://api.exchangeratesapi.io/latest?base=USD"
    );
    var result = JSON.parse(response.getContentText());
    rate = result.rates.CHF;
    cache.put("rates.CHF", rate);
  }
  // Converts dollars to CHF according to the latest rate.
  var swissFrancs = dollars * rate;
  // Returns the CHF value.
  return "CHF" + swissFrancs;
}
