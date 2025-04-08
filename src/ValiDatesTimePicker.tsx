import React from 'react'
import { motion } from "motion/react"
import { match, P } from 'ts-pattern'

import styles from './ValiDatesTimePicker.module.css'
import { Rule } from './'
import { SelectScroller } from './SelectScroller'
import { CalendarPicker } from './CalendarPicker'

const TIME_VALUES_HOURS = Array.from({ length: 12 }, (_, i) => {
  i = i === 0 ? 12 : i
  return `${i.toString()}:`
})
const TIME_VALUES_MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
const TIME_VALUES_AMPM = ['AM', 'PM']

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
const TIME_PICKER_HEIGHT = 32 * 7
const CALENDAR_HEIGHT = 272

const DEFAULT_RULE: Rule = {
  level: 'info',
  range: 'after',
  date: new Date(-8640000000000000), // Tuesday, April 20th, 271,821 BCE
}

const getRuleForDate = (date: Date, rules: Array<Rule>): Rule =>
  rules.find(rule => {
    if (rule.date === date) return rule
    if (rule.date < date && rule.range === 'before') return rule
    if (rule.date > date && rule.range === 'after') return rule
  }) || DEFAULT_RULE

export const ValiDatesTimePicker = (props: ValiDatesTimePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date())
  const rule = getRuleForDate(date, props.rules)

  const ruleMessageElement: React.JSX.Element | undefined = match(rule)
    .with({ level: 'info', message: P.string }, rule => <p>{rule.message}</p>)
    .with({ level: 'error', message: P.string }, rule => <p>{rule.message}</p>)
    .with({ level: 'warning', message: P.string }, rule => <p>{rule.message}</p>)
    .with(
      { level: 'info' },
      { level: 'error' },
      { level: 'warning' },
      { level: 'invalid' },
      () => undefined
    )
    .exhaustive()

  const [editor, setEditor] = React.useState<'time' | 'date'>('time')
  const smallDateDisplayStringStyles = match(editor)
    .with('time', () => ({ height: `${SMALL_STRING_HEIGHT}px`, opacity: 1 })) // when we are editing the time, show the small date string
    .with('date', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the small date string
    .exhaustive()
  const calendarDisplayStyles = match(editor)
    .with('date', () => ({ height: `${CALENDAR_HEIGHT}px`, opacity: 1 })) // when we are editing the date, show the full calendar
    .with('time', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the full calendar
    .exhaustive()
  const smallTimeDisplayStringStyles = match(editor)
    .with('date', () => ({ height: `${SMALL_STRING_HEIGHT}px`, opacity: 1 })) // when we are editing the date, show the small time string
    .with('time', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the small time string
    .exhaustive()
  const timePickerDisplayStyles = match(editor)
    .with('time', () => ({ height: `${TIME_PICKER_HEIGHT}px`, opacity: 1 })) // when we are editing the time, show the full time picker
    .with('date', () => ({ height: 0, opacity: 0 })) // otherwise no need to show the full time picker
    .exhaustive()

  const handleHoursSelect = (value: string) => {
    const hours = parseInt(value.split(':')[0])
    setDate(new Date(date.setHours(hours)))
  }

  const handleMinutesSelect = (value: string) => {
    const minutes = parseInt(value)
    setDate(new Date(date.setMinutes(minutes)))
  }

  const handleAmPmSelect = (value: string) => {
    const hours = date.getHours()
    const isAm = value === 'AM'
    const newHours = isAm ? hours % 12 : hours % 12 + 12
    setDate(new Date(date.setHours(newHours)))
  }

  const handleDayMonthChange = (date: Date) => {
  }

  const getFormattedDate = () => {
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (date.getDate() === new Date().getDate()) {
      return `Today, ${formattedDate.split(' ').slice(1, formattedDate.length).join(' ')}`
    }
    return formattedDate
  }

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
        <a onClick={() => setEditor('date')}>
          {getFormattedDate()} ✎
        </a>
      </motion.div>
      {/* full calendar */}
      <motion.div
        className={styles.calendarPicker}
        animate={calendarDisplayStyles}
        initial={calendarDisplayStyles}
        style={{ overflow: 'hidden' }}
      >
        <CalendarPicker onDateChange={handleDayMonthChange} defaultDate={date} />
      </motion.div>
    </div>
    <div className={styles.section}>
      <hr className={styles.horizontalRule} />
    </div>
    <div className={styles.section}>
      <h3>Time</h3>
      {/* small time string */}
      <motion.div
        animate={smallTimeDisplayStringStyles}
        initial={smallTimeDisplayStringStyles}
        style={{ overflow: 'hidden' }}
      >
        <a onClick={() => setEditor('time')}>
          {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ✎
        </a>
      </motion.div>
      {/* full time picker */}
      <motion.div
        className={styles.timeScrollers}
        animate={timePickerDisplayStyles}
        initial={timePickerDisplayStyles}
        style={{ overflow: 'hidden' }}
      >
        <SelectScroller
          values={TIME_VALUES_HOURS}
          onSelect={handleHoursSelect}
          defaultValue={`${(date.getHours() + 1) % 12}:`}
          infiniteValues
        />
        <SelectScroller
          values={TIME_VALUES_MINUTES}
          onSelect={handleMinutesSelect}
          defaultValue={(date.getMinutes() + 1).toString().padStart(2, '0')}
          infiniteValues
        />
        <SelectScroller
          values={TIME_VALUES_AMPM}
          onSelect={handleAmPmSelect}
          defaultValue={(date.getHours() + 1) < 12 ? 'AM' : 'PM'}
        />
      </motion.div>
    </div >
    {
      ruleMessageElement &&
      <div className={styles.section}>
        {ruleMessageElement}
      </div>
    }
    <div className={styles.actionButtons}>
      <button onClick={() => props.onDateTimeChange(date)}>CANCEL</button>
      <button onClick={() => props.onCancel()}>CONFIRM</button>
    </div>
  </div >
}

ValiDatesTimePicker.defaultProps = defaultProps
