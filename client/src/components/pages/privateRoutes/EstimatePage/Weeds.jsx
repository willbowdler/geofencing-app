import { useEffect } from 'react'

function Weeds({ modalSelected }) {
  const testArr = [1, 2, 3, 4, 5, 6]

  return (
    <div className={modalSelected ? 'modal-selected' : 'est-weeds'}>
      {testArr.map((item, i) => (
        <div className={modalSelected ? 'weed-item-modal' : 'est-weed-item'}>
          {i + 1}
        </div>
      ))}
    </div>
  )
}

export default Weeds
