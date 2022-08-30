import { Icon } from '@iconify/react'

function WeedsModal({ children }) {
  return (
    <div className='weeds-modal-cont'>
      <div className='weeds-modal'>{children}</div>
    </div>
  )
}

export default WeedsModal
