import React, { useEffect, useState } from 'react'
import { motion, useAnimate } from 'motion/react'

import styles from './CalendarPicker.module.css'
import { SelectScroller } from './SelectScroller'

type Props = {
  onDateChange: (date: Date) => void
  defaultDate?: Date
}

type DayProps = {
  value: string
  selected: boolean
  onClick: () => void
}

// returns [' ', ' ', '1', '2', ..., '31'] depending on month
const getPaddedDaysInMonth = (date: Date): Array<string> => {
  const maxDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const days = Array.from({ length: maxDays }, (_, i) => (i + 1).toString()) // ['1', '2', ...maxDays]

  let emptyDaysBeforeFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  emptyDaysBeforeFirstDay === 0 ? 6 : emptyDaysBeforeFirstDay
  const padding = Array.from({ length: emptyDaysBeforeFirstDay }, () => ' ')// [' ', ' ']
  return [...padding, ...days]
}

const getMonthName = (date: Date): string =>
  new Date(0, date.getMonth()).toLocaleString('default', { month: 'long' })

export const CalendarPicker = (props: Props) => {
  const [date, setDate] = useState<Date>(props.defaultDate || new Date())
  const [yearSelectOpen, setYearSelectOpen] = useState<boolean>(false)

  const daysInMonth = getPaddedDaysInMonth(date)
  const numRowsByDaysInMonth = Math.ceil(daysInMonth.length / 7)
  const daysInMonthByRows = Array.from({ length: numRowsByDaysInMonth }, (_, row) =>
    daysInMonth.slice(row * 7, row * 7 + 7)
  )

  const changeMonth = (month: number) => {
    const currentDate = new Date(date) // save this to change it later

    date.setDate(1)
    const newDate = new Date(date.setMonth(month))
    const numDaysInNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()

    currentDate.setDate(Math.min(currentDate.getDate(), numDaysInNewMonth))
    currentDate.setMonth(month)
    setDate(currentDate)
  }

  useEffect(() => props.onDateChange(date), [date])

  return <div className={styles.container}>
    <div className={styles.monthHeader}>
      <a onClick={() => changeMonth(date.getMonth() - 1)}>{`<`}</a>
      <a onClick={() => setYearSelectOpen(!yearSelectOpen)} className={styles.monthYearHeader}>
        <p>{getMonthName(date)}</p>
        <p>{date.getFullYear()}</p>
        ✎
      </a>
      <a onClick={() => changeMonth(date.getMonth() + 1)}>{`>`}</a>
    </div>
    {
      yearSelectOpen &&
      <div className={styles.yearSelect}>
        <SelectScroller
          defaultValue={getMonthName(new Date(0, date.getMonth() + 1))}
          values={Array.from({ length: 12 }, (_, i) => getMonthName(new Date(0, i)))}
          onSelect={(_, month) => { changeMonth(month) }}
        />
        <SelectScroller
          defaultValue={`${date.getFullYear() + 1}`}
          values={Array.from({ length: 20 }, (_, i) => `${i + date.getFullYear() - 10}`)}
          onSelect={(year) => {
            setDate(new Date(date.setFullYear(parseInt(year))))
          }}
        />
      </div>
    }
    {
      !yearSelectOpen &&
      <table className={styles.daysTable}>
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
              <th key={day}>{day}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            daysInMonthByRows.map((days, i) =>
              <tr key={date.getMonth() + date.getFullYear() + i} className={styles.daysRow}>
                {days.map((day, dayIndex) => day.trim() === ''
                  ? <td key={date.getMonth() + date.getFullYear() + dayIndex} />
                  : <Day
                    key={date.getMonth() + date.getFullYear() + day}
                    value={day}
                    selected={date.getDate().toString() === day}
                    onClick={() => setDate(new Date(date.setDate(parseInt(day))))}
                  />
                )}
              </tr>
            )
          }
        </tbody>
      </table>
    }
  </div>
}

const Day = (props: DayProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      scope.current,
      {
        color: props.selected ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
        backgroundColor: props.selected ? '#007bff' : 'rgb(255,255,255)',
      },
    )
  }, [props.selected])

  return <motion.td
    initial={{ color: 'rgb(0,0,0)', backgroundColor: 'rgb(255,255,255)' }}
    ref={scope}
    onClick={props.onClick}
  >
    <p>{props.value}</p>
  </motion.td>
}
