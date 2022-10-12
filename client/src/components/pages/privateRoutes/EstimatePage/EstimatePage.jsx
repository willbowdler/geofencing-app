import { useState, useRef } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import MapComponent from './MapComponent'
import Weeds from './Weeds'

import { Icon } from '@iconify/react'

function EstimatePage() {
  const turfRef = useRef()
  const [rounds, setRounds] = useState([1, 2, 3, 4, 5])

  const handleChangeRounds = () => {
    turfRef.current.value === 'Bermuda/Zoysia'
      ? setRounds([1, 2, 3, 4, 5, 6, 7])
      : setRounds([1, 2, 3, 4, 5])
  }

  const auth = useAuth()
  const [clicked, setClicked] = useState([])

  const [trtTotal, setTrtTotal] = useState(100)
  const [yrTotal, setYrTotal] = useState(0)

  const handleClick = async (i) => {
    if (clicked.includes(i)) {
      await setYrTotal(yrTotal - trtTotal)
      const newArr = clicked.filter((val) => val !== i)
      const rsArr = newArr.map((el) => el + 1)
      console.log(newArr)
      setClicked(newArr)
      setRoundsSelected(rsArr)
    }

    if (!clicked.includes(i)) {
      await setYrTotal(yrTotal + trtTotal)
      let newArr = clicked
      newArr.push(i)
      let rsArr = newArr.map((el) => el + 1)
      setClicked(newArr)
      setRoundsSelected(rsArr)
    }
  }

  const [roundsSelected, setRoundsSelected] = useState([])

  return (
    <div className='est-cont'>
      <div className='est-cont-2'>
        <div className='est-title-bar'>
          <div className='est-title-hello'>Hello Guest{auth.user.email}</div>
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
          <form onSubmit={(e) => e.preventDefault()} className='est-options'>
            <h3>Options</h3>
            <div className='est-turf-type'>
              <div className='option-subheader'>Turf Type</div>
              <select
                className='est-turf-type-input'
                onChange={() => handleChangeRounds()}
                ref={turfRef}
                id='turf-type'
              >
                <option value='Centipede/St.Augustine'>
                  Centipede/St.Augustine
                </option>
                <option value='Bermuda/Zoysia'>Bermuda/Zoysia</option>
              </select>
            </div>
            <div className='est-rounds-cont'>
              <h4 className='option-subheader'>Rounds</h4>
              <div className='est-rounds'>
                {rounds.map((round, i) => {
                  const index = i
                  return (
                    <div
                      onClick={async () => {
                        await handleClick(index)
                      }}
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
              <Weeds prevKillToggle={true} roundsSelected={roundsSelected} />
              <Weeds roundsSelected={roundsSelected} prevKillToggle={false} />
              <input className='est-submit' type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EstimatePage
