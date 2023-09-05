const axios = require("axios");
const { API_KEY } = process.env;

const getCountriesController = async () => {
  var options = {
    method: "GET",
    url: "https://api.countrystatecity.in/v1/countries",
    headers: {
      "X-CSCAPI-KEY": API_KEY,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getStatesController = async (country) => {
  var options = {
    method: "GET",
    url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
    headers: {
      "X-CSCAPI-KEY": API_KEY,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};

// `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`

const getCitiesController = async (state, country) => {
  var options = {
    method: "GET",
    url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
    headers: {
      "X-CSCAPI-KEY": API_KEY,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getCountriesController,
  getStatesController,
  getCitiesController,
};
