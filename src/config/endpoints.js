import constants from "./constants";

const { BASE_URL } = constants;

const endpoints = {
  hotelList: `${BASE_URL}/hotels`,
  hotelReviews: `${BASE_URL}/reviews?hotel_id=`
};

export default endpoints;
