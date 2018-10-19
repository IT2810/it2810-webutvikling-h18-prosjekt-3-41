## Intro - Oscar og Martin
- Hva er snusbrothers og hvor er inspirasjonen fra





## Expo
Expo is the easiest way to get started building React Native applications. It
allows you to get started without installing or configuring Xcode or Android Studio 
for building native code. As long as you have Node.js on your computer you can use npm
(node package manager) to install the Expo CLI command line utility.

```
npm install -g expo-cli
```

Now that you have have the command line utility you only need to run one line to get
started with your React Native project.

```
expo init AppName

cd AppName
npm start
```
This will start the application and was exactly how we got started with the SnusBrothers
project. 

So Expo apps are just React Native apps which contain the Expo SDK (Software Development
Kit). The SDK is a native-and-JS library which provides access to the device's system functionality 
(things like the camera, contacts, local storage, and other hardware). If you want
a deeper understanding of what Expo is i recommend visiting their own documentation site at
https://docs.expo.io/versions/latest/



## Third Party Modules
Oppgave
- Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og 
løsningene som gruppa gjør (inklusive valg av komponenter og api).
- Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i 
tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten 
introduksjon til hva og hvordan).




### Navigation
React Navigation is born from the React Native community's need for an extensible yet 
easy-to-use navigation solution written entirely in JavaScript (so you can read and 
understand all of the source), on top of powerful native primitives.   

Mobile apps are rarely made up of a single screen. SnusBrothers is no
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
        screen: AgendaScreen
    }
},
...
);
```
As you can see we are creating a TabNavigator. We do this so we get the menu at the bottom of 
the screen so we easily can switch between Map- and AgendaScreen. 

This works right out of the box on you do not need any special configuration to make this
work good. You can fill in some more options when creating the navigator as we do over. 
This is configuration about what icons to use and what colors for example. You can read more 
about this in their documentation at:
https://www.reactnavigation.org/docs/en/getting-started.html 



### Map - Oscar og Martin
Her må vi skrive noe om hvorfor og hvordan vi bruker react-native-map








### Calendar - Kristoffer
For the AgendaScreen we choose to use React Native Calendars 
which is an easy to use module that includes various customizable react 
native calendar components. SnusBrothers are suppose to see
their appointments here so they have no trouble in scheduling
their snus-use.   

The Agenda component had everything we wanted. It had an calendar and a screen where 
we can view the appointments. We are able to customize it a lot. We can make customized
items in the agenda and change the theme as we want easily.

Let us take a look at how we implemented the AgendaScreen.

```javascript
<Agenda
        // A week start from Monday(1)
        firstDay={1}
        // See example of item structure over
        items={this.state.addedItems}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={this.loadItems.bind(this)}
        // Selected date on startup - Should me today
        selected={new Date()}
        // Specify how each item should be rendered in agenda
        renderItem={this.renderItem.bind(this)}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        // Specify your item comparison function for increased performance
        rowHasChanged={this.rowHasChanged.bind(this)}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
            selectedDayBackgroundColor: "lightblue",
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'lightblue',
            agendaTodayColor: 'red',
            agendaKnobColor: 'lightblue',
            todayTextColor: 'red',
        }}
    />
```
We are just taking use of some of the customizable settings for the Agenda. In their
documentation on https://github.com/wix/react-native-calendars  you can read much more about
what you can customize here. The most important to look at here are how we give the 
component our items, how we load items for each month at the time depending on where 
the user are looking and how these items should be rendered. 

All the items we show in are Agenda are being saved with AsyncStorage which we are going 
write more about afterwards. 







## AsyncStorage - Martin




## Testing - Alle
### Jest
Her må vi dokumentere testing vår