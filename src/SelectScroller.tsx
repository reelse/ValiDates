import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls, useMotionValue, useSpring } from "motion/react"

import styles from './SelectScroller.module.css'

type SelectScrollerProps = {
  values: Array<string>
  onSelect: (value: string) => void
  defaultValue?: string
  infiniteValues?: boolean
}

const LINE_HEIGHT = 32
const NUM_SHOWN_VALUES = 7 // 3 above, 3 below, 1 in the middle

export const SelectScroller = (props: SelectScrollerProps) => {
  const constraintsRef = useRef(null)
  const y = useMotionValue(0)

  let values = props.values
  if (props.infiniteValues) {
    values.push(...props.values)
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
      const index = values.indexOf(props.defaultValue)
      if (index === -1) {
        throw new Error(`Default value ${props.defaultValue} not found in values`)
      }
      offset += LINE_HEIGHT * (values.length / 2 - index)
    }

    y.set(offset)
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
    return index
  }

  return <div
    className={styles.container}
    ref={constraintsRef}
    style={{ height: `${LINE_HEIGHT * NUM_SHOWN_VALUES}px` }}
  >
    <div
      className={styles.opacityOverlay}
    // style={{ height: `${LINE_HEIGHT * NUM_SHOWN_VALUES}px` }}
    />
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
          props.onSelect(values[index])
          return (Math.round(target / LINE_HEIGHT) + 0.5) * LINE_HEIGHT // snap to grid
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
