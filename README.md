## Intro - Oscar og Martin
- Hva er snusbrothers og hvor er inspirasjonen fra





## Expo - Kristoffer
- Skriv noe om hvordan prosjektet er satt om med Expo







## Tredjeparts
Oppgave
- Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og 
løsningene som gruppa gjør (inklusive valg av komponenter og api).
- Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i 
tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten 
introduksjon til hva og hvordan).







### Navigation - Kristoffer
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








### Map - Oscar og Martin
Her må vi skrive noe om hvorfor og hvordan vi bruker react-native-map








### Calendar - Kristoffer
For the CalenderScreen we choose to use React Native Calendars 
which is an easy to use module that includes various customizable react 
native calendar components. Snusbrothers are suppose to see
their appointments here so they have no trouble in scheduling
their snus-use.   

The Agenda component had everything we wanted. It had an calendar and a screen where 
we can view the appointments. We are able to customize it a lot. We can make customized
items in the agenda and change the theme as we want easily.

Documentation: https://github.com/wix/react-native-calendars 









## Testing - Alle
### Jest
Her må vi dokumentere testing vår