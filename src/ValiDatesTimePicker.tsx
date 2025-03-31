import React from 'react'

import styles from './ValiDatesTimePicker.module.css'
import { Rule } from './'
import { SelectScroller } from './SelectScroller'

const TIME_VALUES_HOURS = Array.from({ length: 12 }, (_, i) => {
  i = i === 0 ? 12 : i
  return `${i.toString()}:`
})
const TIME_VALUES_MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
const TIME_VALUES_AMPM = ['AM', 'PM']

export type ValiDatesTimePickerProps = {
  rules: Array<Rule>
  title?: string
  subtitle?: string
}

const defaultProps: Partial<ValiDatesTimePickerProps> = {
  title: 'Edit Your Time',
  subtitle: 'Select a Time and Date',
}

export const ValiDatesTimePicker = (props: ValiDatesTimePickerProps) => (
  <div className={styles.container}>
    <div className={styles.section}>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
    <div className={styles.section}>
      <h3>Date</h3>
      <a>TODAY, AUG 10, 2025 ✎</a>
    </div>
    <div className={styles.section}>
      <hr className={styles.horizontalRule} />
    </div>
    <div className={styles.section}>
      <h3>Time</h3>
      <div className={styles.timeScrollers}>
        <SelectScroller values={TIME_VALUES_HOURS} />
        <SelectScroller values={TIME_VALUES_MINUTES} />
        <SelectScroller values={TIME_VALUES_AMPM} />
      </div>
    </div>
  </div>
)

ValiDatesTimePicker.defaultProps = defaultProps
