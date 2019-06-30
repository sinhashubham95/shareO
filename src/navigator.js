import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './home';
import ImageDisplay from './imagedisplay';

const AppNavigator = createStackNavigator({
  home: { screen: Home },
  morning: { screen: ImageDisplay },
  afternoon: { screen: ImageDisplay },
  evening: { screen: ImageDisplay },
  night: { screen: ImageDisplay },
}, {
  initialRouteName: 'home',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
