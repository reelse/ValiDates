import '@fontsource-variable/manrope'
import '@fontsource-variable/nunito'

import './index.css'
import './reset.css'
import { ValiDatesTimePicker as ValiDatesTimePickerComponent } from '../src/ValiDatesTimePicker'
import { ValiDatesTimePickerModal as ValiDatesTimePickerModalComponent } from '../src/ValiDatesTimePickerModal'

// ranges are inclusive
export type Range = 'before' | 'after'

export type ValiDate = Date | string

export type Rule =
  | { level: 'info'; range: Range; date: ValiDate; message?: string }
  | { level: 'error'; range: Range; date: ValiDate; message?: string }
  | { level: 'warning'; range: Range; date: ValiDate; message?: string }

export const ValiDatesTimePicker = ValiDatesTimePickerComponent
export const ValiDatesTimePickerModal = ValiDatesTimePickerModalComponent
