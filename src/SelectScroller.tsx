import React from 'react'

import styles from './SelectScroller.module.css'

type SelectScrollerProps = {
  values: Array<string>
}

export const SelectScroller = (props: SelectScrollerProps) =>
  <div className={styles.container}>
    {props.values.map((value, index) =>
      <p key={index} className={styles.text}>{value}</p>
    )}
  </div>