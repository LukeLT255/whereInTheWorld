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
                    response = await fetch(`https://restcountries.com/v3.1/ ${searchByName}`);
                }else if(specificCountry) {
                    response = await fetch(`https://restcountries.com/v3.1/name/${specificCountry}?fulltext=true`);
                }else if(borderCountries) {
                    response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountries.countryInfo[0].borders.toString()}`);
                } else {
                    response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population');
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