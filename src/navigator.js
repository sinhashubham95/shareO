import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './home';

const AppNavigator = createStackNavigator({
  home: { screen: Home },
}, {
  initialRouteName: 'home',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
