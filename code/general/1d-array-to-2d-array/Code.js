let tempArr = [];
let darray = [];

tempArr = tempArr.concat(
  item.getChild("enclosure").getAttribute("url").getValue()
);

darray = tempArr.map(function (el) {
  return [el];
});
