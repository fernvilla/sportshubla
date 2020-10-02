const removeHtmlFromString = str => str.replace(/<\/?[^>]+(>|$)/g, '');

module.exports = {
  removeHtmlFromString
};
