import apiUtils from "../utils/apiUtils";
import endpoints from "../config/endpoints";

const { get } = apiUtils;
const { hotelList, hotelReviews } = endpoints;

export const getHotelList = () => {
  get(hotelList).then(response => response.data);
};

export const getHotelReviews = hotelId => {
  get(`${hotelReviews}${hotelId}`).then(response => console.log(response));
};
