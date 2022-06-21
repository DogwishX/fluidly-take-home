const {
  assertEquals,
  compareTypes,
  compareArraysLength,
  compareArraysItems,
  getTypeOf,
} = require("./assert-equals");

describe("assertEquals", () => {
  describe("when items are equal pass the test", () => {
    test.each`
      a             | b
      ${"str"}      | ${"str"}
      ${["arr", 2]} | ${["arr", 2]}
      ${1}          | ${1}
    `("pass if $a equals $b", ({ a, b }) =>
      expect(() => assertEquals(a, b)).not.toThrow()
    );
  });

  describe("when items are not equal, throw an error", () => {
    test("different types", () =>
      expect(() => assertEquals(1, "2")).toThrow(
        "Expected type number but found type string"
      ));

    test("different numbers", () =>
      expect(() => assertEquals(1, 2)).toThrow("Expected 1 but found 2"));

    test("different strings", () =>
      expect(() => assertEquals("abcef", "abc")).toThrow(
        'Expected "abcef" but found "abc"'
      ));

    test("different array lengths", () =>
      expect(() => assertEquals(["a", "b"], ["a", "b", "c"])).toThrow(
        "Expected array length 2 but found 3"
      ));

    test("different array items", () =>
      expect(() => assertEquals(["a", "b"], ["a", "d"])).toThrow(
        'Expected "b" but found "d"'
      ));
  });
});

describe("compareTypes", () => {
  describe("when types are matching return the type of compared items", () => {
    test.each`
      a                 | b                        | expected
      ${"str"}          | ${"strd"}                | ${"string"}
      ${1}              | ${2}                     | ${"number"}
      ${-9999999999999} | ${2}                     | ${"number"}
      ${["arr", 1, 2]}  | ${[0, undefined, "lol"]} | ${"array"}
      ${null}           | ${null}                  | ${"object"}
      ${compareTypes}   | ${assertEquals}          | ${"function"}
    `(
      "return $expected if type of $a matches type of $b",
      ({ a, b, expected }) => expect(compareTypes(a, b)).toBe(expected)
    );
  });

  describe("when types do not match, throws a TypeError", () => {
    test.each`
      a              | b
      ${"str"}       | ${-1}
      ${[undefined]} | ${{ notArray: true }}
      ${-1}          | ${[0]}
      ${null}        | ${[0, undefined, "lol"]}
    `("compareType($a, $b) throws TypeError", ({ a, b }) => {
      expect(() => compareTypes(a, b)).toThrow(
        `Expected type ${getTypeOf(a)} but found type ${getTypeOf(b)}`
      );
    });
  });
});

describe("compareArraysLength", () => {
  describe("when arrays are equal in length", () => {
    test.each`
      a                           | b
      ${["Saab", "Volvo", "BMW"]} | ${["", "Volvo", "BMW"]}
      ${Array(3)}                 | ${Array(3).fill(null)}
      ${[-1, [2, 2]]}             | ${[0, 2]}
      ${[false]}                  | ${[null]}
    `("$a and $b have same length", ({ a, b }) => {
      expect(() => compareArraysLength(a, b)).not.toThrow();
    });
  });

  describe("when arrays are not equal in length, throw an error", () => {
    test.each`
      a                    | b
      ${["Saab", "Volvo"]} | ${["", "Volvo", "BMW"]}
      ${Array(2)}          | ${Array(3).fill(null)}
      ${[-1, [2, 2]]}      | ${[[]]}
      ${[]}                | ${[null]}
    `("$a and $b have different lengths", ({ a, b }) => {
      expect(() => compareArraysLength(a, b)).toThrow(
        `Expected array length ${a.length} but found ${b.length}`
      );
    });
  });
});

describe("compareArraysItems", () => {
  describe("when array items are equal", () => {
    test.each`
      a                           | b
      ${["Saab", "Volvo", "BMW"]} | ${["Saab", "Volvo", "BMW"]}
      ${Array(3)}                 | ${Array(3)}
      ${[0, 2]}                   | ${[0, 2]}
      ${[false]}                  | ${[false]}
    `("$a and $b have same items", ({ a, b }) => {
      expect(() => compareArraysItems(a, b)).not.toThrow();
    });
  });

  describe("when array items are not equal, throw an error", () => {
    test.each`
      a                    | b
      ${["Saab", "Volvo"]} | ${["Volvo", 0]}
      ${[[2, 2]]}          | ${[[]]}
      ${[-9, null]}        | ${[-99, undefined]}
    `("$a and $b are not equal", ({ a, b }) => {
      expect(() => compareArraysItems(a, b)).toThrow();
    });
  });
});
