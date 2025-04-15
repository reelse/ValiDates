import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls, useMotionValue, useSpring } from "motion/react"

import styles from './SelectScroller.module.css'

type SelectScrollerProps = {
  values: Array<string>
  onSelect: (value: string, index: number) => void
  defaultValue?: string
  infiniteValues?: boolean
}

const LINE_HEIGHT = 32
const NUM_SHOWN_VALUES = 7 // 3 above, 3 below, 1 in the middle
const INFINITE_DUPLICATES = 9 // number of times to duplicate the values for infinite scrolling

export const SelectScroller = (props: SelectScrollerProps) => {
  const constraintsRef = useRef(null)
  const y = useMotionValue(0)

  let values = props.values
  if (props.infiniteValues) {
    // duplicate the values to create an infinite scroll effect
    for (let i = 0; i < INFINITE_DUPLICATES; i++) {
      values = [...values, ...props.values]
    }

  } else {
    // pad the values by Math.floor(NUM_SHOWN_VALUES / 2) on each side
    const padding = Array.from({ length: Math.floor(NUM_SHOWN_VALUES / 2) }, () => ' ')
    values = [...padding, ...props.values, ...padding]
  }

  const dragControls = useDragControls()

  // offset the starting position by half + the index of the passed in value
  useEffect(() => {
    let offset = LINE_HEIGHT * 0.5
    if (props.defaultValue) {
      let index = values.indexOf(props.defaultValue)
      if (index === -1) {
        index = 0
      }
      offset += LINE_HEIGHT * (values.length / 2 - index)
    }
    if (props.infiniteValues) {
      // offset by the number of duplicates
      const numDuplicatesPadding = Math.floor(INFINITE_DUPLICATES / 2)
      offset -= LINE_HEIGHT * props.values.length * numDuplicatesPadding
    }

    y.set(offset)
  }, [])

  // if the scroller is infinite, make sure it stays in the bounds so the user never sees the end
  useEffect(() => {
    const unsubscribe = y.on('animationComplete', () => {
      if (props.infiniteValues) {
        const numDuplicatesPadding = Math.floor(INFINITE_DUPLICATES / 2)
        const minHeight = LINE_HEIGHT * props.values.length * (numDuplicatesPadding - 0.5)
        const maxHeight = LINE_HEIGHT * props.values.length * (numDuplicatesPadding + 1.5)
        if (y.get() < minHeight) {
          y.jump(y.get() + LINE_HEIGHT * props.values.length)
        } else if (y.get() > maxHeight) {
          y.jump(y.get() - LINE_HEIGHT * props.values.length)
        }
      }
    })
    return unsubscribe
  }, [])

  const getCurrentlySelectedIndex = (target: number) => {
    const middleIndex = Math.floor(values.length / 2) - 1
    let index = middleIndex - Math.round(target / LINE_HEIGHT)
    const paddingCount = Math.floor(NUM_SHOWN_VALUES / 2)
    if (!props.infiniteValues && index < paddingCount) {
      index = paddingCount
    }
    if (!props.infiniteValues && index > values.length - paddingCount - 1) {
      index = values.length - paddingCount - 1
    }
    if (props.infiniteValues) {
      // wrap around the index to create an infinite scroll effect
      index = index % props.values.length
    }
    return index
  }

  return <div
    className={styles.container}
    ref={constraintsRef}
    style={{ height: `${LINE_HEIGHT * NUM_SHOWN_VALUES}px` }}
  >
    <div className={styles.opacityOverlay} />
    <motion.div
      style={{ y }}
      drag='y'
      dragConstraints={constraintsRef}
      dragControls={dragControls}
      dragTransition={{
        power: 0, // how much the velocity will be used to keep the component moving after you release it
        timeConstant: 100, // how fast the animation snaps to the target value
        modifyTarget: target => {
          const index = getCurrentlySelectedIndex(target)
          props.onSelect(values[index], index)
          return (Math.floor(target / LINE_HEIGHT) + 0.5) * LINE_HEIGHT// snap to grid
        }
      }}
    >
      {values.map((value, index) => {
        return <p
          key={index}
          className={styles.text}
          style={{
            lineHeight: `${LINE_HEIGHT}px`,
          }}
        >{value}</p>
      }
      )}
    </motion.div>
  </div >
}
