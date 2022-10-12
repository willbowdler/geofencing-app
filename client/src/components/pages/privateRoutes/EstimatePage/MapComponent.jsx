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
      'https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyACJqxC03FSNsG6RFQ7XjAYMXF617BwB60&callback=initMap'
    document.head.append(script)
  }

  let coords = { lat: 32.43159, lng: -90.08828 }

  const initMap = () => {
    let latitude
    let longitude
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: 'us' },
        fields: ['geometry', 'name', 'address_components'],
        types: ['address'],
      }
    )
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace()
      latitude = place.geometry.location.lat()
      longitude = place.geometry.location.lng()
      googleMap.setCenter({ lat: latitude, lng: longitude })
    })

    const mapOptions = {
      center: coords,
      zoom: 20,
      mapTypeId: 'satellite',
    }
    const googleMap = new window.google.maps.Map(mapRef.current, mapOptions)
    const drawingManager = new window.google.maps.drawing.DrawingManager()
    drawingManager.setMap(googleMap)

    drawingManager.addListener('overlaycomplete', function (e) {
      console.log(googleMap.geometry.spherical.computeArea(e.overlay.getPath()))
    })
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
