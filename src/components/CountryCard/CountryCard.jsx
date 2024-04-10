import './CountryCard.css';
//import {useState} from 'react';

// eslint-disable-next-line react/prop-types
function CountryCard({name, pop, region, capital, flagImgSrc, pressHandler}) {


    return (
        <div className="countryCard" onClick={() => pressHandler({name})}>
            <div className="flagImgDiv">
                <img className="flagImg" src={flagImgSrc} alt={"Flag of " + name} />
            </div>
            <div className="countryInfo">
                <h3>{name}</h3>
                <ul>
                    <li><span>Population:</span> {pop.toLocaleString()}</li>
                    <li><span>Region:</span> {region}</li>
                    <li><span>Capital:</span> {capital}</li>
                </ul>
            </div>
        </div>
    )
}

export default CountryCard;