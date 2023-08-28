const axios = require('axios')
const apiKey = "sPcY6pnk-QkXhQUSJ_YeXbvKkfnLTR7BNz8IUcmEsVY3RpncCmxilSwTe3yUqSrBV0E";
const name = "Daniel";
const email = "danielrvt_@hotmail.com";


const getApiToken = async () => {

    let response = await axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`, 
        {headers: {
            "Accept": "application/json",
            "api-token": apiKey,
            "user-email": email
        }
    });
    return response.data.auth_token;
}


const getCountriesController = async () => {
    const token = await getApiToken();
    let response = await axios.get(`https://www.universal-tutorial.com/api/countries/`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }
    );

    let countries = await response.data.map(country => country.country_name);

    return countries;

}

const getStatesController = async (country) => {

    const token = await getApiToken();
    let response = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }
    );

    let states = await response.data.map(state => state.state_name);

    return states;
    //return response.data;
}

const getCitiesController = async (state) => {

    const token = await getApiToken();
    let response = await axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, 
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }
    );

    let cities = await response.data.map(city => city.city_name);

    return cities;
    //return response.data;
}


module.exports = {
    getCountriesController,
    getStatesController,
    getCitiesController,
}