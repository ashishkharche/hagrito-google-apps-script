# Split text on "by" delimeters

For cells that format author and title as "[title] by [authors]"

There are a few key differences between this code and `splitAtFirstComma()`:

1.  The substring " `by` " is used as a string delimiter, instead of "`,` ".
2.  Here the JavaScript [`String.lastIndexOf(substring)`](https://www.w3schools.com/jsref/jsref_lastindexof.asp) method is used instead of [`String.indexOf(substring)`](https://www.w3schools.com/jsref/jsref_indexof.asp). This means if there are multiple " `by` " substrings in the initial string, all but the last " `by` " are assumed to be part of the title.
3.  After splitting the string, the first substring is set as the title and the second as the author (this is the opposite order from `splitAtFirstComma()`).

## References

[Fundamentals of Apps Script with Google Sheets #3: Working with Data  |  Google Developers](https://developers.google.com/codelabs/apps-script-fundamentals-3#8)