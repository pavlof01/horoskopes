import { createStackNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from './screens/SplashScreen';
import PickYourSign from './screens/PickYourSign';
import Home from './screens/Home';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    PickYourSign: {
      screen: PickYourSign,
    },
    Home: {
      screen: Home,
    },
  },
  {
    headerMode: 'none ',
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(AppNavigator);
