import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import createBottomBarOptions from './components/bottomBar';

import SplashScreen from './screens/SplashScreen';
import PickYourSign from './screens/PickYourSign';
import Home from './screens/Home';
import Horoscopes from './screens/Horoscopes';
import Compatibility from './screens/Compatibility';
import Profile from './screens/Profile';
import CompatibilityResult from './screens/Compatibility/compability';
import PickSignByDate from './screens/PickYourSignByDate';

import { fontSize } from './utils';

const Main = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: createBottomBarOptions(
      'Home',
      require('../assets/icons/bottom-menu-icon-home.png'),
    ),
  },
  Horoscopes: {
    screen: Horoscopes,
    navigationOptions: createBottomBarOptions(
      'Horoscopes',
      require('../assets/icons/bottom-menu-icon-horoskopes.png'),
    ),
  },
  Compatibility: {
    screen: Compatibility,
    navigationOptions: createBottomBarOptions(
      'Compatibility',
      require('../assets/icons/bottom-menu-icon-compatibility.png'),
    ),
  },
  Profile: {
    screen: Profile,
    navigationOptions: createBottomBarOptions(
      'Profile',
      require('../assets/icons/bottom-menu-icon-profile.png'),
    ),
  },
}, {
  headerMode: 'none',
});

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    PickYourSign: {
      screen: PickYourSign,
      navigationOptions: () => ({ header: () => null }),
    },
    PickSignByDate: {
      screen: PickSignByDate,
    },
    Home: {
      screen: Main,
      navigationOptions: () => ({ header: () => null }),
    },
    CompatibilityResult: {
      screen: CompatibilityResult,

    },
  },
  {
    headerMode: 'float',
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor: '#ff7e42',
      headerBackTitleStyle: {
        color: '#ff7e42',
        fontFamily: 'Montserrat-Medium',
        fontSize: fontSize(2),
      },
    },
  },
);

export default createAppContainer(AppNavigator);
