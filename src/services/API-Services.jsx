import { api } from "../adapters/api";
const allCountriesPath = 'all?fields=name,capital,region,flags,population,cca3';


export const getAllCountries = () => {
    try{
        return api.get(`${allCountriesPath}`).then((data) => data.json());
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

export const searchByName = (name) => {
    try{
        return api.get(`name/${name}`).then((data) => data.json());
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

export const getSpecificCountry = (countryCode) => {
    try{
        return api.get(`alpha/${countryCode}`).then((data) => data.json());
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

export const getCountriesBasedOnRegion = (region) => {
    try{
        return api.get(`region/${region}`).then((data) =>  data.json());
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

export const getBorderCountries = (borderCountryCodes) => {
    try{
        return api.get(`alpha?codes=${borderCountryCodes.toString()}`).then((borderCountries) => borderCountries.json());
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

