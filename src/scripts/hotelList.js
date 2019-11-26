import apiUtils from "../utils/apiUtils";
import endpoints from "../config/endpoints";
import { createHTMLElement } from "./helpers";
import { applyFilters } from "./utils";
import messages from "../config/messages";
import defaultSettings from "../config/defaultSettings";
import {
  errorMessageComponent,
  resultsNotFoundComponent,
  imageComponent,
  spinnerComponent,
  firstLevelInfoComponent,
  secondLevelInfoComponent,
  thirdLevelInfoComponent
} from "./components";

const { get } = apiUtils;
const { hotelList, hotelReviews } = endpoints;
const { resultsNotFound, errorOccurred } = messages;
const {
  filter: { stars: defaultStars },
  currency: defaultCurrency,
  loadingText
} = defaultSettings;

export const getHotelList = (stars = defaultStars, minPrice, maxPrice) => {
  let results = document.getElementsByClassName("results")[0];
  results.innerHTML = "";
  results.appendChild(spinnerComponent("fas fa-spinner", loadingText));
  get(hotelList).then(response => {
    results.innerHTML = "";
    if (response.statusCode !== 200 || response.data.error) {
      results.appendChild(errorMessageComponent(errorOccurred));
      return;
    }
    const hotelList = applyFilters(response.data, stars, minPrice, maxPrice);
    if (hotelList.length === 0) {
      results.appendChild(resultsNotFoundComponent(resultsNotFound));
      return;
    }
    hotelList.map(hotel => {
      const { name, country, price, stars } = hotel;
      createHotelInstance(results, name, country, price, stars);
    });
  });
};

export const createHotelInstance = (results, name, country, price, stars) => {
  const cardWrapper = createHTMLElement("div", "card-wrapper");
  const cardImage = createHTMLElement("div", "card-image");
  cardImage.appendChild(imageComponent("image", "../assets/hotel1.jpeg"));
  cardWrapper.appendChild(cardImage);
  const cardBody = createHTMLElement("div", "card-body");
  cardBody.appendChild(firstLevelInfoComponent(name));
  cardBody.appendChild(secondLevelInfoComponent(stars.toString(), country));
  cardBody.appendChild(thirdLevelInfoComponent(`${price} ${defaultCurrency}`));
  cardWrapper.appendChild(cardBody);
  results.appendChild(cardWrapper);
};
