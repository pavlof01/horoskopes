import { createStackNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from './screens/SplashScreen';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
  },
  {
    headerMode: 'none ',
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(AppNavigator);
