import { createStackNavigator, createAppContainer } from 'react-navigation';

import App from './App';

const AppNavigator = createStackNavigator(
  {
    App,
  },
  {
    initialRouteName: 'App',
  },
);

export default createAppContainer(AppNavigator);
