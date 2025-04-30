import React, { useEffect } from 'react'
import classnames from 'classnames'
import { motion } from "motion/react"
import { match } from 'ts-pattern'

import styles from './ValiDatesTimePickerModal.module.css'
import { ValiDatesTimePicker, ValiDatesTimePickerProps } from './ValiDatesTimePicker'

export type ValiDatesTimePickerModalProps = {
  open: boolean
  overlayStyle?: React.CSSProperties
  overlayClassName?: string
  modalStyle?: React.CSSProperties
  modalClassName?: string
  valiDatesTimePickerProps: ValiDatesTimePickerProps
}

export const ValiDatesTimePickerModal = (props: ValiDatesTimePickerModalProps) => {
  const [nonAnimatedStyles, setNonAnimatedStyles] = React.useState<React.CSSProperties>({ display: props.open ? 'block' : 'none' })

  useEffect(() => {
    // if the modal is open, set the display to block
    if (props.open) {
      setNonAnimatedStyles({ display: 'block' })
      // if the modal is closed, set the display to none after a delay
      // this is to allow the animation to finish before removing the modal from the DOM
    } else {
      setTimeout(() => {
        setNonAnimatedStyles({ display: 'none' })
      }, 200)
    }
  }, [props.open])

  const overlayStyles = match(props.open)
    .with(true, () => ({ opacity: props.overlayStyle?.opacity || 0.1 }))
    .with(false, () => ({ opacity: 0 }))
    .exhaustive()
  const modalStyles = match(props.open)
    .with(true, () => ({ opacity: 1 }))
    .with(false, () => ({ opacity: 0 }))
    .exhaustive()

  return <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={overlayStyles}
      className={classnames(styles.overlay, props.overlayClassName)}
      style={{ ...nonAnimatedStyles, ...props.overlayStyle }}
      onClick={props.valiDatesTimePickerProps.onCancel}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={modalStyles}
      className={classnames(styles.modal, props.modalClassName)}
      style={{ ...nonAnimatedStyles, ...props.modalStyle }}
    >
      <ValiDatesTimePicker {...props.valiDatesTimePickerProps} />
    </motion.div>
  </>
}
