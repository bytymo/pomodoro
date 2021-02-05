import React, { useState, useRef } from 'react'
import classNames from '../utils/class-names'
import useInterval from '../utils/useInterval'
import Controls from './Controls'
import Play from './Play'
import Timer from './Timer'

function Pomodoro() {
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [remainingTime, setRemainingTime] = useState(2)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  const [controlsDisabled, setControlsDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [currentState, setCurrentState] = useState('Focusing')
  const myAudio = useRef()
  const alarm = new Audio(`${process.env.PUBLIC_URL}/alarm/moogle.mp3`)

  useInterval(
    () => {
      setRemainingTime(remainingTime - 1)
      if (remainingTime <= 0) {
        alarm.play()
        if (currentState === 'Focusing') {
          setCurrentState('On Break')
          setRemainingTime(breakTime * 60)
        } else if (currentState === 'On Break') {
          setCurrentState('Focusing')
          setRemainingTime(focusTime * 60)
        }
      }
    },
    isTimerRunning ? 1000 : null
  )

  const playPause = () => {
    setIsTimerRunning((prevState) => !prevState)
    setIsStopped(false)
    setControlsDisabled(true)
    setStopDisabled(false)
  }

  const handleReset = () => {
    setFocusTime(25)
    setBreakTime(5)
    setRemainingTime(1500)
    setCurrentState('Focusing')
    setIsTimerRunning(false)
    setIsStopped(true)
    setControlsDisabled(false)
    setStopDisabled(true)
  }

  return (
    <div className='pomodoro'>
      <Controls
        focusTime={focusTime}
        setFocusTime={setFocusTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        setRemainingTime={setRemainingTime}
        controlsDisabled={controlsDisabled}
      />
      <Play
        playPause={playPause}
        classNames={classNames}
        isTimerRunning={isTimerRunning}
        handleReset={handleReset}
        stopDisabled={stopDisabled}
      />
      <Timer
        focusTime={focusTime}
        breakTime={breakTime}
        remainingTime={remainingTime}
        currentState={currentState}
        isStopped={isStopped}
        isTimerRunning={isTimerRunning}
      />
      <audio id='alarm' ref={myAudio} src={alarm} type='audio/mp3'></audio>
    </div>
  )
}

export default Pomodoro
