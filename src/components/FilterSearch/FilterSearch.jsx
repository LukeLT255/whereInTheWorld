import './FilterSearch.css';
import {useState} from 'react';

// eslint-disable-next-line react/prop-types
function FilterSearch({filterToParent, searchToParent}) {

    const [search, setSearch] = useState('Search for a country...');
    const [filter, setFilter] = useState('Filter by Region');

    return (
        <>
            <div className="searchDiv">
                <input id='countrySearch' type="text" name="searchInput" value={search} onClick={() => {setSearch(''); searchToParent('')}} onInput={e => {setSearch(e.target.value); searchToParent(e.target.value)} } />
            </div>
            <div className="filterDiv">
                <select name="countryFilter" id="countryFilter" defaultValue={filter} onChange={e => {setFilter(e.target.value); filterToParent(e.target.value)}}>
                    <option value='Filter by Region' disabled>Filter by Region</option>
                    <option value="all regions">All Regions</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
        </>
    )
}

export default FilterSearch;