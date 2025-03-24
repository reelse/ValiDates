import React from 'react'

import styles from './ValiDatesTimePicker.module.css'
import { Rule } from './'

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
      <h3>Time</h3>
    </div>
  </div>
)

ValiDatesTimePicker.defaultProps = defaultProps
