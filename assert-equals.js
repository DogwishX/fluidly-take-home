function assertEquals(expect, actual) {
  const typeOfElements = compareTypes(expect, actual);

  if (typeOfElements === "array") {
    compareArraysLength(expect, actual);
    compareArraysItems(expect, actual);
    return;
  }

  if (expect !== actual) {
    const isTypeString = typeOfElements === "string";
    throwStandardError(expect, actual, isTypeString);
  }
}

function compareTypes(expect, actual) {
  const expectType = getTypeOf(expect);
  const actualType = getTypeOf(actual);

  if (expectType !== actualType)
    throw new TypeError(
      `Expected type ${expectType} but found type ${actualType}`
    );

  return actualType;
}

function compareArraysLength(expect, actual) {
  if (expect.length !== actual.length)
    throw new Error(
      `Expected array length ${expect.length} but found ${actual.length}`
    );
}

function compareArraysItems(expect, actual) {
  expect.forEach((expectItem, index) => {
    const actualItem = actual[index];
    assertEquals(expectItem, actualItem);
  });
}

function throwStandardError(expect, actual, isString) {
  const errorMessage = isString
    ? `Expected "${expect}" but found "${actual}"`
    : `Expected ${expect} but found ${actual}`;
  throw new Error(errorMessage);
}

function getTypeOf(element) {
  return Array.isArray(element) ? "array" : typeof element;
}

module.exports = {
  assertEquals,
  compareTypes,
  compareArraysLength,
  compareArraysItems,
  getTypeOf,
};
