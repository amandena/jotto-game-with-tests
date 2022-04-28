import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState('')
  const success = useSelector(state => state.success)

  if(success) {
    return <div data-test='input-component'/>
  }

  return (
    <div data-test='input-component'>
      <form className='form-inline'>
        <input 
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder='enter guess'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'
          onClick={(e) => {
            e.preventDefault()
            setCurrentGuess('')
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}

export default Input