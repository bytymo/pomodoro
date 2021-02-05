import React from 'react'
import { minutesToDuration, secondsToDuration } from '../utils/duration'
import { PropTypes } from 'prop-types'

export default function Timer({
  focusTime,
  breakTime,
  remainingTime,
  currentState,
  isStopped,
  isTimerRunning,
}) {
  const paused = isTimerRunning ? '' : 'PAUSED'

  const currentTimer = currentState === 'Focusing' ? focusTime : breakTime
  const percent =
    ((currentTimer * 60 - remainingTime) / (currentTimer * 60)) * 100
  if (!isStopped) {
    return (
      <>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className='row mb-2'>
          <div className='col'>
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid='session-title'>
              {currentState} for {minutesToDuration(currentTimer)} minutes
            </h2>

            <p className='lead' data-testid='session-sub-title'>
              {secondsToDuration(remainingTime)} remaining
            </p>
          </div>
        </div>
        <h2>{paused}</h2>
        <div className='row mb-2'>
          <div className='col'>
            <div className='progress' style={{ height: '20px' }}>
              <div
                className='progress-bar'
                role='progressbar'
                aria-valuemin='0'
                aria-valuemax='100'
                aria-valuenow={percent} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${percent}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null
  }
}

Timer.propTypes = {
  focusTime: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  currentState: PropTypes.string.isRequired,
  isStopped: PropTypes.bool.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
}
