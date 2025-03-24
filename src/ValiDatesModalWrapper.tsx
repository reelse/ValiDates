import React from 'react'
import classnames from 'classnames'

import styles from './ValiDatesModalWrapper.module.css'

export type ValiDatesModalWrapperProps = {
  overlayStyle?: React.CSSProperties
  overlayClassName?: string
  modalStyle?: React.CSSProperties
  modalClassName?: string
  children: React.ReactNode
}

export const ValiDatesModalWrapper = (props: ValiDatesModalWrapperProps) => (
  <>
    <div className={classnames(styles.overlay, props.overlayClassName)} style={props.overlayStyle} />
    <div className={classnames(styles.modal, props.modalClassName)} style={props.modalStyle}>
      {props.children}
    </div>
  </>
)
