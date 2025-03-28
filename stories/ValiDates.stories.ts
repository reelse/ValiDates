import '@fontsource-variable/manrope'
import '@fontsource-variable/nunito'

import '../src/reset.css'
import '../src/index.css'
import { ValiDatesTimePicker } from '../src/index'
import { ValiDatesTimePickerProps } from '../src/ValiDatesTimePicker'

export default {
  title: 'ValiDate',
  component: ValiDatesTimePicker,
}

export const SimplestExample: { args: ValiDatesTimePickerProps } = {
  args: {
    rules: [],
    timezone: 'America/New_York',
    onDateTimeChange: (date) => {
      throw new Error('onDateTimeChange: ' + date)
    },
    onCancel: function (): void {
      throw new Error('onCancel')
    }
  },
}
