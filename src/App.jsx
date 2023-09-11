import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import Loader from './components/Loader'


function App() {

  const [inputValue, setinputValue] = useState(getRandomNumber(126))

  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'Hola'}`
  const [ location, getLocation, hasError, isLoading ] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setinputValue(inputSearch.current.value.trim())
  }

  return (
    <div>
      <div className='img__title__container'>
        <img className='img__title' src="https://cdn.europosters.eu/image/hp/66133.jpg" alt="" />
      </div>
      <form className='input' onSubmit={handleSubmit}>
        <input className='input__box' ref={inputSearch} type="text" />
        <button className='input__button'>Search</button>
      </form>
      {
        isLoading
        ? <Loader />
          :hasError
          ? <h2 className='error__message'>Hey! you must provide an id from 1 to 126 Tn T</h2>
          :(<>
              <LocationInfo
              location={location}
              />  
              <div className='resident__cards'>
              {
                location?.residents.map(url => (
                  <ResidentCard 
                  key={url}
                  url={url}
                  />
                ))
              }
            </div>        
        </>
        )}
      </div>
  )
}

export default App
