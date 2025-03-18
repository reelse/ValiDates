# ValiDates (In Progress)
The customizable, rule-based, date-time picker for React!


## Installation
`yarn add @reelse/vali-dates`


## How to Use


### Simply

```
import { ValiDateTimePicker } from '@reelse/vali-dates'

// the first date that the user is allowed to pick
// all dates before this are invalid 
const startDateTime = new Date('1970-1-1 UTC').toISOString()
const endDateTime = new Date('3000-1-1 UTC').toISOString()

// Allow the user to select any date at any time with the default styling
return <ValiDateTimePicker rules={} />
```


### Style the Picker Inline

```
<ValiDateTimePicker
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


## Contributing to the Project

Thanks for your help! To contribute:
- clone the repo
- make your changes on a new branch
- create a PR against main
