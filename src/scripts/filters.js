import { getHotelList } from "./hotelList";
import defaultSettings from "../config/defaultSettings";

const {
  filter: {
    stars: defaultStars,
    minPrice: defaultMinPrice,
    maxPrice: defaultMaxPrice
  }
} = defaultSettings;

export const filterForm = document.getElementsByClassName("filter-wrapper")[0];
filterForm.addEventListener("submit", e => {
  e.preventDefault();
  const minPrice = document.getElementById("min-price").value;
  const maxPrice = document.getElementById("max-price").value;
  const stars = document.getElementById("filter-by-stars").value;
  getHotelList(stars, minPrice, maxPrice);
});

export const resetForm = document.getElementsByClassName("filter-wrapper")[0];
resetForm.addEventListener("reset", e => {
  e.preventDefault();
  document.getElementById("min-price").value = defaultMinPrice;
  document.getElementById("max-price").value = defaultMaxPrice;
  document.getElementById("filter-by-stars").value = defaultStars;
  getHotelList(defaultStars, defaultMinPrice, defaultMaxPrice);
});
