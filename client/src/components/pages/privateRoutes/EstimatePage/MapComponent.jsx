import {
  GoogleMap,
  DrawingManager,
  useLoadScript,
} from '@react-google-maps/api'

function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBBLPwb16EjMMIfCSJdW5TOosKpQ6a34z4',
    libraries: ['drawing'],
  })

  if (!isLoaded) {
    return <div>hey</div>
  } else {
    return (
      <GoogleMap
        zoom={18}
        center={{ lat: 44, lng: -80 }}
        mapContainerClassName='est-map'
      >
        <DrawingManager />
      </GoogleMap>
    )
  }
}

export default MapComponent
