import '@fontsource-variable/manrope'
import '@fontsource-variable/nunito'
import React from 'react'

import '../src/reset.css'
import '../src/index.css'
import { ValiDatesModalWrapper, ValiDatesModalWrapperProps } from '../src/ValiDatesModalWrapper'
import { ValiDatesTimePicker } from '../src/ValiDatesTimePicker'

export default {
  title: 'ValiDate',
  component: ValiDatesModalWrapper,
}

export const SimplestExampleInModal: { args: ValiDatesModalWrapperProps } = {
  args: {
    children: <ValiDatesTimePicker rules={[]} />,
  },
}
