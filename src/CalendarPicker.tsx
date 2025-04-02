import React, { useEffect, useState } from 'react'
import { motion, useAnimate } from 'motion/react'

import styles from './CalendarPicker.module.css'

type Props = {
  onDateChange: (date: Date) => void
  defaultDate?: Date
}

type DayProps = {
  value: string
  selected: boolean
  onClick: () => void
}

const getEmptyDaysBeforeFirstDay = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return firstDay === 0 ? 6 : firstDay
}

// returns [' ', ' ', '1', '2', ..., '31'] depending on month
const getDaysInMonth = (date: Date): Array<string> => {
  const maxDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const days = Array.from({ length: maxDays }, (_, i) => (i + 1).toString())
  const padding = Array.from({ length: getEmptyDaysBeforeFirstDay(date) }, () => ' ')
  const endPadding = Array.from({ length: 42 - (padding.length + days.length) }, () => ' ')
  return [...padding, ...days, ...endPadding]
}

const getMonthName = (date: Date): string =>
  new Date(0, date.getMonth()).toLocaleString('default', { month: 'long' })

export const CalendarPicker = (props: Props) => {
  const [date, setDate] = useState<Date>(props.defaultDate || new Date())
  const [yearSelectOpen, setYearSelectOpen] = useState<boolean>(false)

  const numRowsByDaysInMonth = Math.ceil((getDaysInMonth(date).length) / 7)
  const daysInMonthByRows = Array.from({ length: numRowsByDaysInMonth }, (_, i) =>
    getDaysInMonth(date).slice(i * 7, (i + 1) * 7)
  )

  return <div className={styles.container}>
    <div className={styles.monthHeader}>
      <p>{`<`}</p>
      <div className={styles.monthYearHeader}>
        <p>{getMonthName(date)}</p>
        <p>{date.getFullYear()}</p>
        <a onClick={() => setYearSelectOpen(!yearSelectOpen)}>▼</a>
      </div>
      <p>{`>`}</p>
    </div>
    {
      yearSelectOpen &&
      <select>
        {Array.from({ length: 200 }, (_, i) => i + date.getFullYear() - 100).map(year =>
          <option key={year} value={year}>{year}</option>
        )}
      </select>
    }
    <table className={styles.daysTable}>
      <tr>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
          <th key={day}>{day}</th>
        )}
      </tr>
      {
        daysInMonthByRows.map((days, i) =>
          <tr key={i} className={styles.daysRow}>
            {days.map(day =>
              <Day
                key={day}
                value={day}
                selected={date.getDate().toString() === day}
                onClick={() => setDate(new Date(date.setDate(parseInt(day))))}
              />
            )}
          </tr>
        )
      }
    </table>
  </div>
}

const Day = (props: DayProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      scope.current,
      { backgroundColor: props.selected ? 'lightblue' : 'white' },
    )
  }, [props.selected])

  return <motion.td
    ref={scope}
    onClick={props.onClick}
  >
    <p>{props.value}</p>
  </motion.td>
}
