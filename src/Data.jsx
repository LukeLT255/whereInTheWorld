import { useState, useEffect } from 'react'

function Data(searchByName = false, filterByRegion = false, specificCountry=false, borderCountries=false) {
    const [countryData, setCountryData] = useState([]);
    if(searchByName) {
        searchByName = searchByName.trim();
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = '';
                if(searchByName) {
                    response = await fetch(`https://restcountries.com/v5/ ${searchByName}`, { headers: { 'Authorization': 'Bearer rc_live_8f415d8a458f4ca38192714bd1ed7da7' } });
                }else if(specificCountry) {
                    response = await fetch(`https://restcountries.com/v5/name/${specificCountry}?fulltext=true`, { headers: { 'Authorization': 'Bearer rc_live_8f415d8a458f4ca38192714bd1ed7da7' } });
                }else if(borderCountries) {
                    response = await fetch(`https://restcountries.com/v5/alpha?codes=${borderCountries.countryInfo[0].borders.toString()}`, { headers: { 'Authorization': 'Bearer rc_live_8f415d8a458f4ca38192714bd1ed7da7' } });
                } else {
                    response = await fetch('https://restcountries.com/v5/all?fields=name,capital,region,flags,population', { headers: { 'Authorization': 'Bearer rc_live_8f415d8a458f4ca38192714bd1ed7da7' } });
                }
                const result = await response.json();
                setCountryData(result);
                //countryData = result;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchByName, filterByRegion, specificCountry, borderCountries, setCountryData]);

    function checkFilter(country) {
        return country.region.toLowerCase() === filterByRegion.toLowerCase();
    }
    
    let filteredCountryData = countryData;


    if(filterByRegion && filterByRegion !== 'all regions' && countryData.status !== 404) {
        filteredCountryData = countryData.filter(checkFilter);
    }
    //console.log(filteredCountryData);
    return filteredCountryData
}

export default Data
