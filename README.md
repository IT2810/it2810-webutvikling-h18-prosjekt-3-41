### Navigation
Mobile apps are rarely made up of a single screen. Snusbrother is no
exception. To manage the presentation of, and transition between,
multiple screens we have used React Navigation which is a standard
when getting started using React Native. React Navigation provides
an easy to use navigation solution, with the ability to present a common
tabbed navigation pattern that most users are familiar with on iOS
and Android.   
In App.js you will see how the stack of screens looks like:

```javascript
import { createBottomTabNavigator  } from 'react-navigation';
export default createBottomTabNavigator ({
    // Here we add the different screens
    Map: {
        screen: MapScreen
    },
    Calendar: {
        screen: CalenderScreen
    }
},
...
);
```

Documentation: https://reactnavigation.org/

### Calendar
For the CalenderScreen we choose to use React Native Calendars 
which is an easy to use module that includes various customizable react 
native calendar components. Snusbrothers are suppose to see
their appointments here so they have no trouble in scheduling
their snus-use.   

Documentation: https://github.com/wix/react-native-calendars 
