import { useRef, useEffect } from 'react'

function MapComponent({
  setClicked,
  setTrtTotal,
  setYrTotal,
  setRoundsSelected,
  editSqFt,
  setEditSqFt,
}) {
  const mapRef = useRef()
  const inputRef = useRef()

  // const auth = useAuth()

  if (!window.google) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyCVCi4wteacHhyOfMWsiA57yV8nErkyCHY&callback=initMap`
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
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      polygonOptions: {
        clickable: true,
        // draggable: true,
        editable: true,
        fillColor: 'green',
        fillOpacity: 0.2,
      },
      drawingMode: 'polygon',
    })
    drawingManager.setMap(googleMap)

    const polygons = []
    let polyAreas
    let areaSum
    const getAreaSum = (areasArr) =>
      areasArr.reduce((prev, cur) => prev + cur, 0)
    const getAreaFt = (polygon) => {
      return Math.floor(
        window.google.maps.geometry.spherical.computeArea(
          polygon.overlay.getPath()
        ) * 10.764
      )
    }

    drawingManager.addListener('overlaycomplete', function (e) {
      polygons.push(e)
      // console.log(e)
      // console.log(polygons)
      polyAreas = polygons.map((p) => getAreaFt(p))
      areaSum = getAreaSum(polyAreas)
      console.log(polyAreas)
      console.log(areaSum)

      window.google.maps.event.addListener(
        e.overlay.getPath(),
        'set_at',
        function (ev) {
          polyAreas = polygons.map((p) => getAreaFt(p))
          areaSum = getAreaSum(polyAreas)
          setRoundsSelected([])
          setClicked([])
          setYrTotal(0)
          setTrtTotal(Math.floor((areaSum / 1000) * 5))
          setEditSqFt(`${areaSum}`)
          console.log(polyAreas)
          console.log(areaSum)
        }
      )
      //   //This is where the cost rate is defined
      setTrtTotal(Math.floor((areaSum / 1000) * 10))
      setRoundsSelected([])
      setClicked([])
      setYrTotal(0)
      setEditSqFt(`${areaSum}`)
    })
  }
  useEffect(() => (window.initMap = initMap), [])

  return (
    <div className='map-cont'>
      <div className='map-head'>
        <input
          ref={inputRef}
          className='map-input'
          type='text'
          placeholder='Address'
        />
        <h3>Sqaure Feet: {editSqFt}</h3>
      </div>
      <div ref={mapRef} className='est-map'></div>
    </div>
  )
}

export default MapComponent
