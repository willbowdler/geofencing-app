import MapComponent from './MapComponent'

function EstimatePage() {
  return (
    <div className='est-cont'>
      <div className='est-cont-2'>
        <div className='est-title-bar'>
          <div className='est-title-hello'>Hello Will</div>
          <div className='est-title-total'>
            <div className='treatment-total'>{`${100} per treatment`}</div>
            <div className='yearly-total'>{`${1000} per year`}</div>
          </div>
        </div>
        <div className='est-flex'>
          <div className='est-estimate'>
            <div className='est-map'>
              <MapComponent />
              <input className='map-input' type='text' placeholder='Address' />
            </div>
            <div className='address'></div>
          </div>
          <form className='est-options'>
            <h3>Options</h3>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EstimatePage
