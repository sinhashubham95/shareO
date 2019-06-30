import { createStackNavigator } from 'react-navigation';
import Home from './home';

export default createStackNavigator({
  home: { screen: Home },
}, {
  initialRouteName: 'home',
});
