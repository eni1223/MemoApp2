import { createAppContainer, createStackNavigator } from 'react-navigation';
import MemoListScreen from './src/screens/MemoListScreen';

const App = createStackNavigator({
  Home: {
    screen: MemoListScreen,
    navigationOptions: {
      title: 'Memot',
      headerStyle: {
        backgroundColor: '#265366',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    },
  },
});

export default createAppContainer(App);
