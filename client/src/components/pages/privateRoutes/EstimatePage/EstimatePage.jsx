import { useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import MapComponent from './MapComponent'
import Weeds from './Weeds'
import WeedsModal from './WeedsModal'

import { Icon } from '@iconify/react'

function EstimatePage() {
  const turfRef = useRef()

  const auth = useAuth()
  const [clicked, setClicked] = useState(['hey'])

  const [trtTotal, setTrtTotal] = useState(100)
  const [yrTotal, setYrTotal] = useState(0)

  const rounds =
    turfRef.current.value === 'Centipede/St.Augustine'
      ? [1, 2, 3, 4, 5, 6]
      : [1, 2, 3, 4, 5, 6, 7, 8]

  const handleClick = async (i) => {
    if (clicked.includes(i)) {
      await setYrTotal(yrTotal - trtTotal)
      const newArr = clicked.filter((val) => val !== i)
      setClicked(newArr)
    }

    if (!clicked.includes(i)) {
      await setYrTotal(yrTotal + trtTotal)
      clicked.push(i)
      setClicked(clicked)
    }
  }

  return (
    <div className='est-cont'>
      <div className='est-cont-2'>
        <div className='est-title-bar'>
          <div className='est-title-hello'>Hello {auth.user.email}</div>
          <div className='est-title-total'>
            <div className='treatment-total'>{`${trtTotal} per treatment`}</div>
            <div className='yearly-total'>{`${yrTotal} per year`}</div>
          </div>
        </div>
        <div className='est-flex'>
          <div className='est-estimate'>
            <MapComponent setTrtTotal={setTrtTotal} setYrTotal={setYrTotal} />

            <div className='address'></div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className='est-options'
          >
            <h3>Options</h3>
            <div className='est-turf-type'>
              <div className='option-subheader'>Turf Type</div>
              <input
                ref={turfRef}
                className='est-turf-type-input'
                list='turf-type'
              />
              <datalist id='turf-type'>
                <option value='Centipede/St.Augustine' />
                <option value='Bermuda/Zoysia' />
              </datalist>
            </div>
            <div className='est-rounds-cont'>
              <h4 className='option-subheader'>Rounds</h4>
              <div className='est-rounds'>
                {rounds.map((round, i) => {
                  const index = i
                  return (
                    <div
                      onClick={async () => await handleClick(index)}
                      className={
                        clicked.includes(index)
                          ? 'est-round'
                          : 'est-round est-round-selected'
                      }
                      key={i}
                    >
                      {i + 1}
                    </div>
                  )
                })}
              </div>
              <div className='option-subheader'>
                <h4>Weeds Killed</h4>
                <Icon className='icon' icon='ic:twotone-fullscreen' />
              </div>
              {/* <WeedsModal> */}
              <Weeds />
              {/* </WeedsModal> */}
              <div className='option-subheader'>
                <h4>Weeds Prevented</h4>
                <Icon className='icon' icon='ic:twotone-fullscreen' />
              </div>
              <Weeds />
              <input className='est-submit' type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EstimatePage
