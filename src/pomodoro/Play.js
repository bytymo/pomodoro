import React from 'react'
import { PropTypes } from 'prop-types'

export default function Play({
  playPause,
  classNames,
  isTimerRunning,
  handleReset,
  stopDisabled,
}) {
  return (
    <div className='row'>
      <div className='col'>
        <div
          className='btn-group btn-group-lg mb-2'
          role='group'
          aria-label='Timer controls'
        >
          <button
            type='button'
            className='btn btn-primary'
            data-testid='play-pause'
            title='Start or pause timer'
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                'oi-media-play': !isTimerRunning,
                'oi-media-pause': isTimerRunning,
              })}
            />
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            title='Stop the session'
            onClick={handleReset}
            disabled={stopDisabled}
          >
            <span className='oi oi-media-stop' />
          </button>
        </div>
      </div>
    </div>
  )
}

Play.propTypes = {
  playPause: PropTypes.func.isRequired,
  classNames: PropTypes.func.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  stopDisabled: PropTypes.bool.isRequired,
}
