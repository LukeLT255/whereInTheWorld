/* eslint-disable react/prop-types */
import './CountryDetails.css';
// import {useState, useEffect} from 'react';
//import {useState} from 'react';

function CountryDetails(props) {
    const borderCountries = props.borderCountries;
    
    const specificCountryData = props.countryInfo;

    return (
        <>
            {(specificCountryData.length === 1) ?
                <div>
                    <button className='backButton' onClick={() => props.pressHandler('')}>Back</button>
                    <div className='countryDetailsContainer'>
                        <img className='countryDetailsImg' src={specificCountryData[0].flags.png} alt={specificCountryData[0].flags.alt} />
                        <div className='countryDetailsDiv'>
                            <h2>{specificCountryData[0].name.common}</h2>
                            <div className='leftDetails'>
                                <p><span>Official Name:</span> {specificCountryData[0].name.official}</p>
                                <p><span>Population:</span> {specificCountryData[0].population.toLocaleString()}</p>
                                <p><span>Region:</span> {specificCountryData[0].region}</p>
                                <p><span>Sub Region:</span> {specificCountryData[0].subregion}</p>
                                <p><span>Capitol:</span> {specificCountryData[0].capital}</p>
                            </div>
                            <div className='rightDetails'>
                                <p><span>Top Level Domain:</span> {specificCountryData[0].tld}</p>
                                <p><span>Currencies:</span> {
                                    Object.entries(specificCountryData[0].currencies).map((entry, index) => (
                                        (index <= (Object.entries(specificCountryData[0].currencies).length - 2) && (Object.entries(specificCountryData[0].currencies).length > 1)) ?
                                        `${entry[1].name}, `
                                        :
                                        entry[1].name
                                    ))
                                }</p>
                                <p><span>Languages:</span> {
                                    Object.entries(specificCountryData[0].languages).map((entry ,index) => (
                                        (index <= (Object.entries(specificCountryData[0].languages).length - 2) && (Object.entries(specificCountryData[0].languages).length > 1)) ?
                                        `${entry[1]}, `
                                        :
                                        entry[1]

                                    ))
                                }</p>
                            </div>
                            {/* {console.log(Object.entries(borderCountries))} */}
                            <p className='borderCountries'>Borders: {
                                (borderCountries.length >= 1
                                ?
                                Object.entries(borderCountries).map((entry, index) => (
                                    <span key={index} className='borderCountry' onClick={() => props.pressHandler(entry[1].cca3)}>{entry[1].name.common}</span>
                                ))
                                :
                                '')
                            }</p>
                        </div>
                    </div>  
                </div>
            :
            <div className='countryError'>
                <button className='backButton' onClick={() => props.pressHandler('')}>Back</button>
                { <h2>Country data could not be fetched. Please try again.</h2> }
            </div>
            }
        </>
    )
}

export default CountryDetails;