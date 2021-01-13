module.exports = function (orignalHtml, ele) {
  let output = orignalHtml;
  output = output.replace(/{%id%}/g, ele.id);
  output = output.replace(/{%productName%}/g, ele.productName);
  output = output.replace(/{%image%}/g, ele.image);
  output = output.replace(/{%from%}/g, ele.nutrients);
  output = output.replace(/{%quantity%}/g, ele.quantity);
  output = output.replace(/{%price%}/g, ele.price);
  output = output.replace(/{%description%}/g, ele.description);
  if (ele.organic === false) {
    output = output.replace(/{%organic%}/g, "notorganic");
  }

  return output;
};
