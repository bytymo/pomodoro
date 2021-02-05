import React from 'react'
import { minutesToDuration } from '../utils/duration'
import { PropTypes } from 'prop-types'

export default function Controls({
  focusTime,
  setFocusTime,
  breakTime,
  setBreakTime,
  setRemainingTime,
  controlsDisabled,
}) {
  // Create handlers for each state

  const decreaseFocusTime = () => {
    setFocusTime((prevTime) => Math.max(5, prevTime - 5))
    setRemainingTime((prevTime) => Math.max(300, prevTime - 5 * 60))
  }
  const increaseFocusTime = () => {
    setFocusTime((prevTime) => Math.min(60, prevTime + 5))
    setRemainingTime((prevTime) => Math.min(3600, prevTime + 5 * 60))
  }
  const decreaseBreakTime = () => {
    setBreakTime((prevTime) => Math.max(1, prevTime - 1))
  }
  const increaseBreakTime = () => {
    setBreakTime((prevTime) => Math.min(15, prevTime + 1))
  }

  return (
    <div className='row'>
      <div className='col'>
        <div className='input-group input-group-lg mb-2'>
          <span className='input-group-text' data-testid='duration-focus'>
            Focus Duration: {minutesToDuration(focusTime)}
          </span>
          <div className='input-group-append'>
            <button
              type='button'
              className='btn btn-secondary'
              data-testid='decrease-focus'
              onClick={decreaseFocusTime}
              disabled={controlsDisabled}
            >
              <span className='oi oi-minus' />
            </button>

            <button
              type='button'
              className='btn btn-secondary'
              data-testid='increase-focus'
              onClick={increaseFocusTime}
              disabled={controlsDisabled}
            >
              <span className='oi oi-plus' />
            </button>
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='float-right'>
          <div className='input-group input-group-lg mb-2'>
            <span className='input-group-text' data-testid='duration-break'>
              Break Duration: {minutesToDuration(breakTime)}
            </span>
            <div className='input-group-append'>
              <button
                type='button'
                className='btn btn-secondary'
                data-testid='decrease-break'
                onClick={decreaseBreakTime}
                disabled={controlsDisabled}
              >
                <span className='oi oi-minus' />
              </button>

              <button
                type='button'
                className='btn btn-secondary'
                data-testid='increase-break'
                onClick={increaseBreakTime}
                disabled={controlsDisabled}
              >
                <span className='oi oi-plus' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  focusTime: PropTypes.number.isRequired,
  setFocusTime: PropTypes.func.isRequired,
  breakTime: PropTypes.number.isRequired,
  setBreakTime: PropTypes.func.isRequired,
  setRemainingTime: PropTypes.func.isRequired,
  controlsDisabled: PropTypes.bool.isRequired,
}
