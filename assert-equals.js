function assertEquals(expect, actual) {
  const actualType = checkTypes(expect, actual);

  if (actualType === "array")
    return areArraysEqual(expect, actual);
}

function checkTypes(expect, actual) {
  const typeOf = (element) =>
    Array.isArray(element)
      ? "array"
      : typeof element;

  const expectType = typeOf(expect);
  const actualType = typeOf(actual);

  if (expectType !== actualType)
    throw new TypeError(
      `Expected type ${expectType} but found type ${actualType}`
    );

  return actualType;
}

function areArraysEqual(expect, actual) {
  if (expect.length !== actual.length)
    throw new Error(
      `Expected array length ${expect.length} but found ${actual.length}`
    );
}

function throwStandardError() {
  throw new Error(
    `Expected ${expect} but found ${actual}`
  );
}

module.exports = {
  assertEquals,
  checkTypes,
  areArraysEqual,
};
