const { TestScheduler } = require("jest");
const {
  assertEquals,
  checkTypes,
  areArraysEqual,
} = require("./assert-equals");

describe("assertEquals", () => {});

describe("checkTypes", () => {
  describe("when types are matching do not throw an error", () => {
    test.each`
      a                 | b                         | expected
      ${"str"}          | ${"strd"}                 | ${"string"}
      ${1}              | ${2}                      | ${"number"}
      ${-9999999999999} | ${2}                      | ${"number"}
      ${["arr", 1, 2]}  | ${[0, undefined, "lol"]}  | ${"array"}
      ${null}           | ${{ thisIsObject: true }} | ${"object"}
      ${checkTypes}     | ${assertEquals}           | ${"function"}
    `(
      "return $expected if typeof $a matches typeof $b",
      ({ a, b, expected }) =>
        expect(checkTypes(a, b)).toBe(expected)
    );
  });

  describe("when types do not match, throws a TypeError", () => {
    test.each`
      a              | b
      ${"str"}       | ${-1}
      ${[undefined]} | ${{ notArray: true }}
      ${-1}          | ${[0]}
      ${null}        | ${[0, undefined, "lol"]}
    `(
      "checkType($a, $b) throws TypeError",
      ({ a, b }) => {
        expect(() => checkTypes(a, b)).toThrow(
          TypeError
        );
      }
    );
  });
});

describe("areArraysEqual", () => {
  describe("when arrays are equal in length do not throw an error", () => {
    test.each`
      a                           | b
      ${["Saab", "Volvo", "BMW"]} | ${["", "Volvo", "BMW"]}
      ${Array(3)}                 | ${Array(3).fill(null)}
      ${[-1, [2, 2]]}             | ${[0, 2]}
      ${[false]}                  | ${[null]}
    `(
      "$a and $b have same length",
      ({ a, b }) => {
        expect(() =>
          areArraysEqual(a, b)
        ).not.toThrow();
      }
    );
  });
});
