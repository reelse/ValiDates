import React from 'react'
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
      style={props.overlayStyle}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={modalStyles}
      className={classnames(styles.modal, props.modalClassName)}
      style={props.modalStyle}
    >
      <ValiDatesTimePicker {...props.valiDatesTimePickerProps} />
    </motion.div>
  </>
}
