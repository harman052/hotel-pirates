import * as utils from "../utils";

const { filterByStars, getHotelWithinPriceRange } = utils;

const hotelList = [
  {
    hotelName: "Park Inn",
    location: "Berlin",
    stars: 4,
    price: 200
  },
  {
    hotelName: "Hilton",
    location: "San Francisco",
    stars: 5,
    price: 400
  },
  {
    hotelName: "Marriott",
    location: "London",
    stars: 5,
    price: 600
  }
];

describe("Filter hotel list by star", () => {
  test("whether it returns original hotel list when number of stars argument is passed as all", () => {
    expect(filterByStars(hotelList, "all")).toBe(hotelList);
  });

  test("whether it returns hotel list containing matching number of stars", () => {
    expect(filterByStars(hotelList, "5").length).toBe(2);
  });
});

describe("Filter hotel list by price range", () => {
  test("return original hotel list when no minimum and maximum price provided", () => {
    expect(getHotelWithinPriceRange("", "", hotelList)).toBe(hotelList);
  });

  test("if minimum price is greater than maximum price, return empty list ", () => {
    expect(getHotelWithinPriceRange(2, 1, hotelList).length).toBe(0);
  });
});
