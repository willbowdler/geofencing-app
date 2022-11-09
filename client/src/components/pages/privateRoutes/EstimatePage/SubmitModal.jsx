import { useState } from 'react'

function SubmitModal({ setSubModalShow, emailData }) {
  const [submitClicked, setSubmitClicked] = useState(false)

  const submitMessage =
    'Submitting this estimate will send an email to our office staff indicating that you are interested in getting an official quote from us. If you submit, we will reach out to you shortly during our normal business hours. You can call us as well if you would like. Are you sure you would like to submit?'
  const submittedMessage =
    'Your estimate has been submitted! Thank you and we look forward to being in contact with you shortly.'
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!submitClicked) {
          fetch('/api/email/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          })
          setSubmitClicked(true)
        }

        if (submitClicked) {
          setSubmitClicked(false)
          setSubModalShow(false)
        }
      }}
      className='submit-modal-cont'
    >
      <div className='submit-modal'>
        <div className='submit-message'>
          {!submitClicked ? submitMessage : submittedMessage}
        </div>
        <input
          className='submit-button'
          type='submit'
          value={!submitClicked ? 'Submit' : 'Close Window'}
        />
      </div>
    </form>
  )
}

export default SubmitModal
