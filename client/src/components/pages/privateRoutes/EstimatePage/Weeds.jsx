import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

function Weeds({ modalSelected, setModalClicked }) {
  const [weeds, setWeeds] = useState(null)

  useEffect(() => {
    async function fetchWeeds() {
      const res = await fetch('/api/weeds')
      const data = await res.json()
      console.log(data)
      setWeeds(data)
    }
    fetchWeeds()
  }, [])

  // Create an array keeing track of which rounds are selected. Data model each weed document have an array that specifies which rounds it dies on. use an array method to iterate through an array to check and see if the selected array has matching values to the weed document killed array, if it does, if it renders back true, render a picture and title of that weed.

  if (!weeds) {
    return <div>Loading</div>
  }
  if (weeds) {
    return (
      <>
        {modalSelected && (
          <div>
            <Icon
              onClick={() => setModalClicked(false)}
              className='icon-modal'
              icon='ic:twotone-fullscreen'
            />
          </div>
        )}
        <div className={modalSelected ? 'modal-selected' : 'est-weeds'}>
          {weeds.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(${item.pictureURL})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className={modalSelected ? 'weed-item-modal' : 'est-weed-item'}
            >
              {modalSelected && (
                <h1 className='weed-item-title'>{item.name}</h1>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default Weeds
