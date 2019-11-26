import { createHTMLElement } from "../helpers";

describe("createHTMLElement", () => {
  test("whether it creates HTML element with correct class", () => {
    const element = createHTMLElement("div", "abc", "placeholder text");
    expect(element.getAttribute("class")).toBe("abc");
  });

  test("whether it creates HTML element with correct content", () => {
    const element = createHTMLElement("div", "abc", "placeholder text");
    expect(element.innerHTML).toBe("placeholder text");
  });
});
