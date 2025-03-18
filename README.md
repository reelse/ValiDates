# ValiDates (In Progress)
The customizable, rule-based, date-time picker for React!

ValiDates is a dateTime picker for React that aims to simply provide you the ability to setup dateTime ranges that fall into one of four categories:

- Info: This is a totally legitimate dateTime that the end user should be able to select.\
i.e. "I started working today at 8am"\
`rules={} // ValiDate is permissive by default. This would let the user select any date since 0CE!`\
`rules={ level: 'info', range: 'before', date: new Date('3000-1-1'), message: 'Thanks for clocking in!' }`

- Error: The end user should not be able to select this dateTime because it doesn't make sense for your application. The end user is shown a message but cannot submit.\
i.e. "I started working yesterday at 2am"
```
const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

const endOfToday = new Date()
endOfToday.setHours(23, 59, 59, 999)

const message = 'The selected date must be today.'

rules={[
  { level: 'error',  range: 'before', date: startOfToday, message },
  { level: 'error',  range: 'after', date: endOfToday, message },
]}
```

- Warning: The end user is allowed to select this date, but is shown a warning message letting them know that it may not be what they expected.\
i.e. "I was scheduled to work at 8am, but I started working at 7am"
```
const startOfWork = new Date()
startOfWork.setHours(8, 0, 0, 0)

rules={[
  { level: 'warning', range: 'before', date: startOfWork, message: 'Are you sure you meant to start before 8am?' },
]}
```

- Invalid: The end user cannot select this date. No message is shown because the date does not show up on the picker.\
i.e. "I want to start working at 8am... on Jan 1, 1969"
```
const startOfEpoch = new Date('1970-1-1 UTC')

rules={[
  { level: 'invalid', range: 'before', date: startOfEpoch },
]}
```

Rules are in priority order. ValiDates selects the first rule that fits each possible dateTime. If no rule fits, the dateTime is valid.


## Installation
`yarn add @reelse/vali-dates`


## How to Use


### Simplest and Most Permissive

```
import { ValiDateTimePicker } from '@reelse/vali-dates'

// Allow the user to select any date at any time with the default styling
return <ValiDateTimePicker rules={} />
```


### Style the Picker Inline

```
<ValiDateTimePicker
  rules={}
  modalContainerStyles={{
    borderRadius: '30px',
    boxShadow: 'rgba(50, 50, 90, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.25) 0px 4px 8px -4px',
  }}
  dateTimeButtonStyles={{
    backgroundColor: 'orange',
  }}
/>
```

For a full breakdown of possible style props, see here.


### Style the Picker with CSS

MyComponent.jsx:
```
import styles from './MyComponent.module.css'

<ValiDateTimePicker
  rules={}
  modalClassName={styles.modalClassName}
  dateTimeButtonsClassName={styles.dateTimeButtonsClassName}
/>
```

MyComponent.module.css:
```
.modalClassName {
  border-radius: '30px';
  box-shadow: 'rgba(50, 50, 90, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.25) 0px 4px 8px -4px';
}

.dateTimeButtonsClassName {
  backgroundColor: 'orange';
}
```

### Add Rules
```
const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

const endOfToday = new Date()
endOfToday.setHours(23, 59, 59, 999)

const startOfWork = new Date()
startOfWork.setHours(8, 0, 0, 0)

const errorMessage = 'The selected date must be today.'
const warningMessage = 'Are you sure you meant to start before 8am?'

<ValiDateTimePicker
  rules={[
    { level: 'error',  range: 'before', date: startOfToday, errorMessage },
    { level: 'error',  range: 'after', date: endOfToday, errorMessage },
    { level: 'warning', range: 'before', date: startOfWork, message: warningMessage },
  ]}
/>
```


## Contributing to the Project

Thanks for your help! To contribute:
- clone the repo
- make your changes on a new branch
- create a PR against main
