export const removeHtmlFromString = str => str.replace(/<\/?[^>]+(>|$)/g, '');
