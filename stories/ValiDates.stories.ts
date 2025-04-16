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
    onConfirm: (date) => { throw new Error('onDateTimeChange: ' + date) },
    onCancel: () => { throw new Error('onCancel') },
  },
}

export const InfoRuleExample: { args: ValiDatesTimePickerProps } = {
  args: {
    rules: [{ level: 'info', range: 'after', date: new Date(-8640000000000000), message: 'This is an info message' }],
    timezone: 'America/New_York',
    onConfirm: (date) => { throw new Error('onDateTimeChange: ' + date) },
    onCancel: () => { throw new Error('onCancel') },
  },
}

export const ErrorBeforeNowRuleExample: { args: ValiDatesTimePickerProps } = {
  args: {
    rules: [{ level: 'error', range: 'before', date: new Date(), message: 'This is an error message' }],
    timezone: 'America/New_York',
    onConfirm: (date) => { throw new Error('onDateTimeChange: ' + date) },
    onCancel: () => { throw new Error('onCancel') },
  },
}

export const WarningBeforeNowRuleExample: { args: ValiDatesTimePickerProps } = {
  args: {
    rules: [{ level: 'warning', range: 'before', date: new Date(), message: 'This is a warning message' }],
    timezone: 'America/New_York',
    onConfirm: (date) => { throw new Error('onDateTimeChange: ' + date) },
    onCancel: () => { throw new Error('onCancel') },
  },
}
