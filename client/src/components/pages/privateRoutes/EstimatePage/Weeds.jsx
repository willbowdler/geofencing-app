import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import WeedsModal from './WeedsModal'

function Weeds({ roundsSelected, prevKillToggle }) {
  const [weeds, setWeeds] = useState(null)
  const [mappedWeeds, setMappedWeeds] = useState([])
  const [modalClicked, setModalClicked] = useState(false)

  const filterWeedsPrevent = async () => {
    let newArr = weeds.filter((weed) =>
      weed.preventable.some((el) => (roundsSelected.includes(el) ? true : null))
    )
    await setMappedWeeds(newArr)
  }

  const filterWeedsKill = async () => {
    let newArr = weeds.filter((weed) =>
      weed.killable.some((el) => (roundsSelected.includes(el) ? true : null))
    )
    await setMappedWeeds(newArr)
  }

  useEffect(() => {
    async function fetchWeeds() {
      const res = await fetch('/api/weeds')
      const data = await res.json()

      setWeeds(data)
    }
    fetchWeeds()
  }, [])

  useEffect(() => {
    if (weeds) {
      prevKillToggle ? filterWeedsKill() : filterWeedsPrevent()
    }
  }, [roundsSelected])

  if (!weeds) {
    return <div>Loading</div>
  }
  if (weeds) {
    return (
      <>
        <div className='option-subheader'>
          <h4>{`Weeds ${prevKillToggle ? 'Killed' : 'Prevented'}`}</h4>
          <Icon
            onClick={() => roundsSelected.length >= 1 && setModalClicked(true)}
            className='icon'
            icon='ic:twotone-fullscreen'
          />
        </div>
        <div className='est-weeds'>
          {mappedWeeds.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(${item.pictureURL})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className='est-weed-item'
            ></div>
          ))}
        </div>

        {modalClicked && (
          <div className='weeds-modal-cont'>
            <div className='icon-modal-flex'>
              <h1 className='modal-title'>
                {prevKillToggle ? 'Weeds Killed' : 'Weeds Prevented'}
              </h1>
              <Icon
                icon='ic:twotone-fullscreen'
                className='icon-modal'
                onClick={() => setModalClicked(false)}
              />
            </div>

            <div className='modal-flex'>
              {mappedWeeds.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundImage: `url(${item.pictureURL})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className='weed-item-modal'
                >
                  <h1>{item.name}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Weeds
