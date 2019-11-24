export const filterByStars = (hotelList, numberOfStars) => {
  if (numberOfStars > 0 && numberOfStars <= 5) {
    return hotelList.filter(hotel => numberOfStars == hotel.stars);
  }
};

export const sortLowestToHighestPrice = hotelList => {
  return hotelList.sort((a, b) => a.price - b.price);
};
