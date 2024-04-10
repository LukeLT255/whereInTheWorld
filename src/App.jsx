import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import CountryCard from './components/CountryCard/CountryCard'
import FilterSearch from './components/FilterSearch/FilterSearch'
import CountryDetails from './components/CountryDetails/CountryDetails'

import {getAllCountries, searchByName, getSpecificCountry, getCountriesBasedOnRegion, getBorderCountries} from './services/API-Services'

function App() {

  const [filterInput, setFilterInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showPageDetail, setShowPageDetail] = useState('');
  const [data, setData] = useState([]);
  const [borderData, setBorderData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  if (showPageDetail) {
    document.body.classList.add('countryDetails');
  } else {
    document.body.classList.remove('countryDetails');
  }

  const filterToParent = (filterData) => {
    setFilterInput(filterData);
  }

  const searchToParent = (searchData) => { 
    setSearchInput(searchData);
  }

  // eslint-disable-next-line no-unused-vars
  const handlePress = (name) => {
    setShowPageDetail(name);
    setRefresh(!refresh);
    setBorderData([]);
    setData([]);
    setSearchInput('');
    setFilterInput('');
    setLoading(true);
  }

  useEffect(() => {
    if(showPageDetail) {
      getSpecificCountry(showPageDetail.toLowerCase()).then((country) => {
        setData(country);
        if(country[0].borders) {
          getBorderCountries(country[0].borders).then((borders) => setBorderData(borders));
        }
        setLoading(false);
      });
    }
    else if(searchInput && filterInput && filterInput !== 'all regions'){
      searchByName(searchInput).then((countries) => {
        const countriesThatMatchRegion = countries.filter(checkRegion);
        function checkRegion(country) {
          return country.region.toLowerCase() == filterInput;
        }
        setData(countriesThatMatchRegion);
        setLoading(false);
      });
    }
    else if(searchInput) {
      searchByName(searchInput).then((countries) => {
        setData(countries);
        setLoading(false);
      });
    } else if(filterInput && filterInput !== 'all regions') {
      getCountriesBasedOnRegion(filterInput).then((countries) => {
        setData(countries);
        setLoading(false);
      });
    }
     else {
      getAllCountries().then((countries) => {
        setData(countries);
        setLoading(false);
      });
    }
  }, [refresh, searchInput, showPageDetail, filterInput]);

  //loading
  if (loading) {
    return (
      <>
        <Header/>
        <Loading/>
      </>
    )
  }

  return (
    <>
      <Header/>
      <main>
        {
        !showPageDetail
        ?
          <>
            <section className='filterSearchSection'>
              <FilterSearch filterToParent={filterToParent} searchToParent={searchToParent}/>
            </section>
            <section className='countryCardsSection' >
              {
                (data.message !== 'Page Not Found' && data.status !== 404) ?
                data.map((item, index) => (
                    <CountryCard pressHandler={() => handlePress(item.cca3)} key={index} region={item.region} name={item.name.common} capital={item.capital} pop={item.population} flagImgSrc={item.flags.png}/>
                  )) :
                  <div>
                    <h2>No Countries Found</h2>
                  </div>
              }
            </section>
          </>
        :
          <section className='countryDetailsSection'>
            <CountryDetails pressHandler={handlePress} countryInfo={data} borderCountries={borderData}/>
          </section>
        }
      </main>

    </>
  )
}

export default App
