import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

function Weeds({ prevKillToggle, modalSelected, setModalClicked }) {
  const [weeds, setWeeds] = useState([])
  const [filteredKill, setFilteredKill] = useState([])
  const [mappedWeeds, setMappedWeeds] = useState([])

  const roundsSelected = [2, 10, 22]

  const filterWeedsPrevent = async () => {
    let newArr = weeds.filter((weed) =>
      weed.preventable.some((el) => (roundsSelected.includes(el) ? true : null))
    )
    await setMappedWeeds(newArr)

    console.log(newArr)
  }

  const filterWeedsKill = async () => {
    let newArr = weeds.filter((weed) =>
      weed.killable.some((el) => (roundsSelected.includes(el) ? true : null))
    )
    await setMappedWeeds(newArr)

    console.log(newArr)
  }

  useEffect(() => {
    async function fetchWeeds() {
      const res = await fetch('/api/weeds')
      const data = await res.json()
      console.log(data)
      await setWeeds(weeds.push(...data))
      prevKillToggle ? filterWeedsKill() : filterWeedsPrevent()
      // These are temporarily here. Later add them to an onlick. Also add functionality to delete items from the 'selected' array
    }
    fetchWeeds()
  }, [])

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
          {mappedWeeds.map((item, i) => (
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
