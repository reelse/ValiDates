import React from 'react'
import { motion } from "motion/react"
import { match } from 'ts-pattern'

import styles from './ValiDatesTimePicker.module.css'
import { Rule } from './'

export type ValiDatesTimePickerProps = {
  rules: Array<Rule>
  timezone: string // America/New_York
  onDateTimeChange: (dateTime: Date) => void
  onCancel: () => void
  title?: string
  subtitle?: string
}

const defaultProps: Partial<ValiDatesTimePickerProps> = {
  title: 'Time & Date',
  subtitle: 'Select a Time and Date',
}

const SMALL_STRING_HEIGHT = 24
const CALENDAR_HEIGHT = 100
const TIME_PICKER_HEIGHT = 100

const getRuleForDate = (date: Date, rules: Array<Rule>): Rule | undefined =>
  rules.find(rule => {
    if (rule.date === date) return rule
    if (rule.date < date && rule.range === 'before') return rule
    if (rule.date > date && rule.range === 'after') return rule
  })

export const ValiDatesTimePicker = (props: ValiDatesTimePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date())
  const [editor, setEditor] = React.useState<'time' | 'date'>('time')

  const smallDateDisplayStringStyles = match(editor)
    .with('time', () => ({ height: SMALL_STRING_HEIGHT, opacity: 1 })) // when we are editing the time, show the small date string
    .with('date', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the small date string
    .exhaustive()
  const calendarDisplayStyles = match(editor)
    .with('date', () => ({ height: CALENDAR_HEIGHT, opacity: 1 })) // when we are editing the date, show the full calendar
    .with('time', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the full calendar
    .exhaustive()
  const smallTimeDisplayStringStyles = match(editor)
    .with('date', () => ({ height: SMALL_STRING_HEIGHT, opacity: 1 })) // when we are editing the date, show the small time string
    .with('time', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the small time string
    .exhaustive()
  const timePickerDisplayStyles = match(editor)
    .with('time', () => ({ height: TIME_PICKER_HEIGHT, opacity: 1 })) // when we are editing the time, show the full time picker
    .with('date', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the full time picker
    .exhaustive()

  return <div className={styles.container}>
    <div className={styles.section}>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
    <div className={styles.section}>
      <h3>Date</h3>
      {/* small date string */}
      <motion.div
        animate={smallDateDisplayStringStyles}
        initial={smallDateDisplayStringStyles}
        style={{ overflow: 'hidden' }}
      >
        <a onClick={() => setEditor('date')}>TODAY, AUG 10, 2025 ✎</a>
      </motion.div>
      {/* full calendar */}
      <motion.div
        animate={calendarDisplayStyles}
        initial={calendarDisplayStyles}
        style={{ overflow: 'hidden' }}
      >
        <p> full calendar here </p>
      </motion.div>
    </div>
    <div className={styles.section}>
      <h3>Time</h3>
      {/* small time string */}
      <motion.div
        animate={smallTimeDisplayStringStyles}
        initial={smallTimeDisplayStringStyles}
        style={{ overflow: 'hidden' }}
      >
        <a onClick={() => setEditor('time')}>6:26 PM ✎</a>
      </motion.div>
      {/* full time picker */}
      <motion.div
        animate={timePickerDisplayStyles}
        initial={timePickerDisplayStyles}
        style={{ overflow: 'hidden' }}
      >
        <p> full time picker here </p>
      </motion.div>
    </div>
    <div className={styles.section}>
      <p> Info text here </p>
      <p> Error text here </p>
      <p> Warning text here </p>
    </div>
    <div className={styles.actionButtons}>
      <button onClick={() => props.onDateTimeChange(date)}>CANCEL</button>
      <button onClick={() => props.onCancel()}>CONFIRM</button>
    </div>
  </div >
}

ValiDatesTimePicker.defaultProps = defaultProps
