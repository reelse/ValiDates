import React, { useLayoutEffect, useRef } from 'react'

import styles from './SelectScroller.module.css'

type SelectScrollerProps = {
  values: Array<string>
  onSelect: (value: string) => void
  defaultValue?: string
  infiniteValues?: boolean
}

const LINE_HEIGHT = 32
const NUM_SHOWN_VALUES = 7 // 3 above, 3 below, 1 in the middle
const INFINITE_DUPLICATES = 9 // number of times to duplicate the values for infinite scrolling

// Helper to get the currently centered index
const getCurrentlySelectedIndex = (scrollRef: HTMLDivElement, paddingItemCount) => {
  if (!scrollRef) return 0
  const scrollTop = scrollRef.scrollTop
  const index = Math.round(scrollTop / LINE_HEIGHT) + paddingItemCount

  return index
}

export const SelectScroller = (props: SelectScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<number | null>(null)

  let values = props.values
  if (props.infiniteValues) {
    // duplicate the values to create an infinite scroll effect
    for (let i = 0; i < INFINITE_DUPLICATES; i++) {
      values = [...values, ...props.values]
    }
  }

  // pad the values with enough empty items to allow the first and last values to be in the center
  const paddingItemCount = Math.floor(NUM_SHOWN_VALUES / 2)
  const padding = Array.from({ length: paddingItemCount }, () => ' ')
  values = [...padding, ...values, ...padding]

  // Set initial scroll position to center the default value
  useLayoutEffect(() => {
    if (!scrollRef.current) return
    let index = 0
    if (props.defaultValue) {
      index = values.indexOf(props.defaultValue)
      if (props.infiniteValues) {
        index = index + Math.floor(INFINITE_DUPLICATES / 2) * props.values.length
      }
      if (index === -1) index = 0
    }
    // Center the selected value
    const scrollTo = LINE_HEIGHT * index - LINE_HEIGHT * paddingItemCount
    scrollRef.current.scrollTop = scrollTo
  }, [])

  // Debounced onSelect after scroll settles
  const handleScroll = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = null
    }
    scrollTimeout.current = setTimeout(() => {
      props.onSelect(values[getCurrentlySelectedIndex(scrollRef.current, paddingItemCount)])
      scrollTimeout.current = null
    }, 120)
  }

  return (
    <div className={styles.container} style={{ height: `${LINE_HEIGHT * NUM_SHOWN_VALUES}px` }}>
      <div className={styles.opacityOverlay} />
      <div ref={scrollRef} className={styles.scroller} onScroll={handleScroll}>
        {values.map((value, index) => (
          <p
            key={index}
            className={styles.text}
            style={{
              lineHeight: `${LINE_HEIGHT}px`,
            }}
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  )
}
