import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'

export default function DatepickerComponent({ date, setDate, label, min, max }) {
  return (
    <div>
      <DatePicker
        label={label ? label : null}
        defaultValue={date}
        onChange={value => { setDate(dayjs(value)) }}
        minDate={min ? dayjs(min) : null}
        maxDate={max ? dayjs(max) : null}
      />
    </div>
  )
}
