import React, { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'

type Props = {
  isCheckedIn: boolean
  checkedInTime: number
}

const Stopwatch = ({ isCheckedIn, checkedInTime }: Props) => {
  const [startTime, setStartTime] = useState<Moment | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (startTime !== null) {
      interval = setInterval(() => {
        const elapsed = moment
          .duration(moment().diff(startTime))
          .asMilliseconds()
        setElapsedTime(elapsed)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [startTime])

  useEffect(() => {
    checkedInTime !== 0 && isCheckedIn ? handleStart() : handleStop()
  }, [isCheckedIn])

  const handleStart = () => {
    setStartTime(moment(checkedInTime))
  }

  const handleStop = () => {
    setStartTime(null)
    setElapsedTime(0)
  }

  const formatTime = (time: number) => {
    const duration = moment.duration(time)
    const hours = Math.floor(duration.asHours())
    const minutes = Math.floor(duration.asMinutes()) % 60
    const seconds = Math.floor(duration.seconds())
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {elapsedTime > 0 && (
        <h1 className="mt-4 text-3xl font-bold text-[#3f9944] font-mono">
          {formatTime(elapsedTime)}
        </h1>
      )}
    </>
  )
}

export default Stopwatch
