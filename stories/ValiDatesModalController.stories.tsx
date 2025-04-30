// stories to handle opening and closing the modal

import React from 'react'
import '@fontsource-variable/manrope'
import '@fontsource-variable/nunito'

import '../src/reset.css'
import '../src/index.css'
import { ValiDatesTimePickerModal } from '../src/ValiDatesTimePickerModal'

const Controller = () => {
  const [open, setOpen] = React.useState(false)

  return <>
    <ValiDatesTimePickerModal
      open={open}
      valiDatesTimePickerProps={{
        rules: [],
        timezone: 'America/New_York',
        onConfirm: (date) => {
          setOpen(false)
        },
        onCancel: function (): void {
          setOpen(false)
        }
      }}
    />

    <button onClick={() => {
      setOpen(true)
    }}>Toggle</button>
  </>
}

export default {
  title: 'ValiDate',
  component: Controller,
}

export const ModalToggle = {}
