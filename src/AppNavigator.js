import { createStackNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from './screens/SplashScreen';
import PickYourSign from './screens/PickYourSign';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    PickYourSign: {
      screen: PickYourSign,
    },
  },
  {
    headerMode: 'none ',
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(AppNavigator);
