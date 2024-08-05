import { TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'

export default function TimepickerComponent({ time, setTime, label, min }) {
  return (
    <div>
      <TimePicker
        label={label}
        defaultValue={dayjs(time)}
        onChange={(newValue) => setTime(dayjs(newValue))}
        minTime={min ? dayjs(min) : ""}
      />
    </div>
  )
}
