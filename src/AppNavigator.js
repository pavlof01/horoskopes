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
});

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    PickYourSign: {
      screen: PickYourSign,
    },
    Home: {
      screen: Main,
    },
    CompatibilityResult: {
      screen: CompatibilityResult,
    },
  },
  {
    headerMode: 'none ',
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(AppNavigator);
