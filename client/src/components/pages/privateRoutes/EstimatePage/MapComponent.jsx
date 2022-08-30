import { useRef, useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'

function MapComponent({ setTrtTotal, setYrTotal }) {
  const mapRef = useRef()
  const inputRef = useRef()

  const auth = useAuth()
  // if google script is loaded correctly, window.google would exist as an object
  if (!window.google) {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyACJqxC03FSNsG6RFQ7XjAYMXF617BwB60&libraries=drawing,geometry,places&callback=initMap'
    document.head.append(script)
  }

  let coords

  const initMap = () => {
    coords = { lat: 32.43159, lng: -90.08828 }
    const mapOptions = {
      center: coords,
      zoom: 20,
      mapTypeId: 'satellite',
    }
    const googleMap = new window.google.maps.Map(mapRef.current, mapOptions)
    const drawingManager = new window.google.maps.drawing.DrawingManager()
    drawingManager.setMap(googleMap)

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: 'us' },
        fields: ['geometry', 'name', 'address_components'],
        types: ['address'],
      }
    )
  }

  window.initMap = initMap

  return (
    <div className='map-cont'>
      <input
        ref={inputRef}
        className='map-input'
        type='text'
        placeholder='Address'
      />
      <div ref={mapRef} className='est-map'></div>
    </div>
  )
}

export default MapComponent
