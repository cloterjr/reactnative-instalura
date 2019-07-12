import { AsyncStorage } from 'react-native';
import Login from './screens/Login';
import Feed from './components/Feed';


import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Permit to go back to last screen
// const Routes = createAppContainer(
//   createStackNavigator({
//     Login: Login,
//     Feed: {
//         screen: Feed,
//         defaultNavigationOptions: {
//             title: 'Feed'
//         }
//     },
//   })
// );

const Routes = createAppContainer(createSwitchNavigator(
    {
      Login: Login,
      Feed: { screen: Feed, navigationOptions: { title: 'Feed' }}
    },
    {
      initialRouteName: 'Login'
    }
  ))

export default Routes;