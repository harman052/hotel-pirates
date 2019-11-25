import apiUtils from "../utils/apiUtils";
import endpoints from "../config/endpoints";
import { createHTMLElement } from "./helpers";
import { applyFilters } from "./filters";
import constants from "../config/constants";

const { get } = apiUtils;
const { hotelList, hotelReviews } = endpoints;
const { CURRENCY, DEFAULT_STARS, ERROR_MESSAGE, RESULTS_NOT_FOUND } = constants;

export const getHotelList = (stars = DEFAULT_STARS, minPrice, maxPrice) => {
  let results = document.getElementsByClassName("results")[0];
  results.innerHTML = "";
  results.appendChild(spinnerComponent("fas fa-spinner", "Loading"));
  get(hotelList).then(response => {
    results.innerHTML = "";
    if (response.statusCode !== 200 || response.data.error) {
      results.appendChild(errorMessageComponent(ERROR_MESSAGE));
      return;
    }
    const hotelList = applyFilters(response.data, stars, minPrice, maxPrice);
    if (hotelList.length === 0) {
      results.appendChild(resultsNotFoundComponent(RESULTS_NOT_FOUND));
      return;
    }
    hotelList.map(hotel => {
      const { name, country, city, price, stars } = hotel;
      createHotelInstance(results, name, city, country, price, stars);
    });
  });
};

export const getHotelReviews = hotelId => {
  get(`${hotelReviews}${hotelId}`).then(response => console.log(response));
};

const errorMessageComponent = message => {
  const errorMessage = createHTMLElement("div", null, message);
  return errorMessage;
};

const resultsNotFoundComponent = message => {
  const resultsNotFound = createHTMLElement("div", null, message);
  return resultsNotFound;
};

const imageComponent = (className, path) => {
  const image = createHTMLElement("img", className);
  image.setAttribute("src", path);
  return image;
};

const iconComponent = iconClassName => {
  const icon = createHTMLElement("i", iconClassName);
  return icon;
};

const starsComponent = (iconClassName, noOfStars) => {
  const stars = createHTMLElement("div", "stars", noOfStars);
  const icon = iconComponent(iconClassName);
  stars.appendChild(icon);
  return stars;
};

const spinnerComponent = (iconClassName, text) => {
  const loading = createHTMLElement("div", "loading");
  const spinnerIcon = iconComponent(iconClassName);
  const loadingText = createHTMLElement("div", "loadingText", text);
  loading.appendChild(spinnerIcon);
  loading.appendChild(loadingText);
  return loading;
};

const locationComponent = (iconClassName, countryName) => {
  const location = createHTMLElement("div", "location");
  const icon = iconComponent(iconClassName);
  const country = createHTMLElement("div", "country", countryName);
  location.appendChild(icon);
  location.appendChild(country);
  return location;
};

const reviewLinkComponent = (reviewsClassName, iconClassName) => {
  const reviews = createHTMLElement("div", reviewsClassName);
  const reviewsLink = createHTMLElement("a", null, "Reviews");
  reviewsLink.setAttribute("href", "#");
  const rightIcon = iconComponent(iconClassName);
  reviewsLink.appendChild(rightIcon);
  reviews.appendChild(reviewsLink);
  return reviews;
};

const firstLevelInfoComponent = hotelName => {
  const firstLevelInfo = createHTMLElement(
    "div",
    "first-level-info",
    hotelName
  );
  return firstLevelInfo;
};

const secondLevelInfoComponent = (noOfStars, country) => {
  const secondLevelInfo = createHTMLElement("div", "second-level-info");
  // const stars = createHTMLElement("div", "stars", noOfStars);
  // secondLevelInfo.appendChild(stars);
  secondLevelInfo.appendChild(starsComponent("fas fa-star", noOfStars));
  secondLevelInfo.appendChild(
    locationComponent("fas fa-map-marker-alt", country)
  );
  return secondLevelInfo;
};

const thirdLevelInfoComponent = price => {
  const thirdLevelInfo = createHTMLElement("div", "third-level-info");
  const cost = createHTMLElement("div", "cost", price);
  thirdLevelInfo.appendChild(cost);
  // const reviews = createHTMLElement("div", "reviews");
  // const reviewsLink = createHTMLElement("a", null, "Reviews");
  // reviewsLink.setAttribute("href", "");
  // reviews.appendChild(reviewsLink);
  thirdLevelInfo.appendChild(
    reviewLinkComponent("reviews", "fas fa-arrow-right")
  );
  return thirdLevelInfo;
};

export const createHotelInstance = (
  results,
  name,
  city,
  country,
  price,
  stars
) => {
  const cardWrapper = createHTMLElement("div", "card-wrapper");
  const cardImage = createHTMLElement("div", "card-image");
  cardImage.appendChild(imageComponent("image", "../assets/hotel1.jpeg"));
  cardWrapper.appendChild(cardImage);
  const cardBody = createHTMLElement("div", "card-body");
  cardBody.appendChild(firstLevelInfoComponent(name));
  cardBody.appendChild(secondLevelInfoComponent(`${stars} `, `${country}`));
  cardBody.appendChild(thirdLevelInfoComponent(`${price} ${CURRENCY}`));
  cardWrapper.appendChild(cardBody);
  results.appendChild(cardWrapper);
};

const filterForm = document.getElementsByClassName("filter-wrapper")[0];
filterForm.addEventListener("submit", e => {
  e.preventDefault();
  const minPrice = document.getElementById("min-price").value;
  const maxPrice = document.getElementById("max-price").value;
  const stars = document.getElementById("filter-by-stars").value;
  getHotelList(stars, minPrice, maxPrice);
});

const resetForm = document.getElementsByClassName("filter-wrapper")[0];
resetForm.addEventListener("reset", e => {
  e.preventDefault();
  document.getElementById("min-price").value = "";
  document.getElementById("max-price").value = "";
  document.getElementById("filter-by-stars").value = 3;
  getHotelList(DEFAULT_STARS, "", "");
});
