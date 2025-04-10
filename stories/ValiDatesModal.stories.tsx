import React from 'react'
import '@fontsource-variable/manrope'
import '@fontsource-variable/nunito'

import '../src/reset.css'
import '../src/index.css'
import { ValiDatesTimePickerModal, ValiDatesTimePickerModalProps } from '../src/ValiDatesTimePickerModal'

export default {
  title: 'ValiDate',
  component: ValiDatesTimePickerModal,
}

export const SimplestExampleInModal: { args: ValiDatesTimePickerModalProps } = {
  args: {
    open: true,
    valiDatesTimePickerProps: {
      rules: [],
      timezone: 'America/New_York',
      onConfirm: (date) => {
        throw new Error('onDateTimeChange: ' + date)
      },
      onCancel: function (): void {
        throw new Error('onCancel')
      }
    },
  },
}
