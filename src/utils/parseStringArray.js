module.exports = (text) => {
  const stringArray = text.split(',').map(item => item.trim());
  return stringArray;
}