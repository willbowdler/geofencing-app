import { useAuth } from '../../context/AuthContext'

function LogoutModal({ setLogModalShown }) {
  const { logoutUser } = useAuth()
  return (
    <div className='submit-modal-cont'>
      <div className='submit-modal'>
        <div className='submit-message'>Are you sure you want to logout?</div>
        <div className='submit-btn-div'>
          <button
            onClick={() => {
              logoutUser()
              setLogModalShown(false)
            }}
            className='submit-button'
          >
            Yes
          </button>
          <button
            onClick={() => {
              setLogModalShown(false)
            }}
            className='submit-button'
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
