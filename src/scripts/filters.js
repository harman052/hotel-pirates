export const filterByStars = (hotelList, numberOfStars) => {
  if (numberOfStars === "all") {
    return hotelList;
  }
  if (numberOfStars > 0 && numberOfStars <= 5) {
    return hotelList.filter(hotel => numberOfStars == hotel.stars);
  }
};

// export const sortLowestToHighestPrice = hotelList => {
//   return hotelList.sort((a, b) => a.price - b.price);
// };

export const getHotelWithinPriceRange = (
  minPrice = "",
  maxPrice = "",
  hotelList
) => {
  /**
   * Default case
   */
  if (!minPrice && !maxPrice) {
    return hotelList;
  }
  /**
   * If no max limit provided, returning results will have no upper bound limit
   * and not less than min price provided
   */
  if (minPrice && !maxPrice) {
    return hotelList.filter(hotel => hotel.price >= minPrice);
  }
  /**
   * If no min limit provided, returning results will have no lower bound limit
   * and not more than max price provided
   */
  if (!minPrice && maxPrice) {
    return hotelList.filter(hotel => hotel.price <= maxPrice);
  }
  /**
   * Invalid case, return no results
   */
  if (minPrice > maxPrice) {
    return [];
  }

  return hotelList.filter(
    hotel => hotel.price >= minPrice && hotel.price <= maxPrice
  );
};

export const applyFilters = (hotelList, numberOfStars, minPrice, maxPrice) => {
  return getHotelWithinPriceRange(
    minPrice,
    maxPrice,
    filterByStars(hotelList, numberOfStars)
  );
};
