import { createHTMLElement } from "./helpers";

export const errorMessageComponent = message => {
  const errorMessage = createHTMLElement("div", null, message);
  return errorMessage;
};

export const resultsNotFoundComponent = message => {
  const resultsNotFound = createHTMLElement("div", null, message);
  return resultsNotFound;
};

export const imageComponent = (className, path) => {
  const image = createHTMLElement("img", className);
  image.setAttribute("src", path);
  return image;
};

export const iconComponent = iconClassName => {
  const icon = createHTMLElement("i", iconClassName);
  return icon;
};

export const starsComponent = (iconClassName, noOfStars) => {
  const stars = createHTMLElement("div", "stars", noOfStars);
  const icon = iconComponent(iconClassName);
  stars.appendChild(icon);
  return stars;
};

export const spinnerComponent = (iconClassName, text) => {
  const loading = createHTMLElement("div", "loading");
  const spinnerIcon = iconComponent(iconClassName);
  const loadingText = createHTMLElement("div", "loadingText", text);
  loading.appendChild(spinnerIcon);
  loading.appendChild(loadingText);
  return loading;
};

export const locationComponent = (iconClassName, countryName) => {
  const location = createHTMLElement("div", "location");
  const icon = iconComponent(iconClassName);
  const country = createHTMLElement("div", "country", countryName);
  location.appendChild(icon);
  location.appendChild(country);
  return location;
};

export const reviewLinkComponent = (reviewsClassName, iconClassName) => {
  const reviews = createHTMLElement("div", reviewsClassName);
  const reviewsLink = createHTMLElement("a", null, "Reviews");
  reviewsLink.setAttribute("href", "#");
  const rightIcon = iconComponent(iconClassName);
  reviewsLink.appendChild(rightIcon);
  reviews.appendChild(reviewsLink);
  return reviews;
};

export const firstLevelInfoComponent = hotelName => {
  const firstLevelInfo = createHTMLElement(
    "div",
    "first-level-info",
    hotelName
  );
  return firstLevelInfo;
};

export const secondLevelInfoComponent = (noOfStars, country) => {
  const secondLevelInfo = createHTMLElement("div", "second-level-info");
  secondLevelInfo.appendChild(starsComponent("fas fa-star", noOfStars));
  secondLevelInfo.appendChild(
    locationComponent("fas fa-map-marker-alt", country)
  );
  return secondLevelInfo;
};

export const thirdLevelInfoComponent = price => {
  const thirdLevelInfo = createHTMLElement("div", "third-level-info");
  const cost = createHTMLElement("div", "cost", price);
  thirdLevelInfo.appendChild(cost);
  thirdLevelInfo.appendChild(
    reviewLinkComponent("reviews", "fas fa-arrow-right")
  );
  return thirdLevelInfo;
};
