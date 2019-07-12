import { AsyncStorage } from 'react-native';
import Login from './screens/Login';
import Feed from './components/Feed';


import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

// Permit to go back to last screen
const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: 'Feed'
        }
    },
    PerfilUsuario: {
        screen: Feed,
        navigationOptions: {
            title: 'Perfil de Usuario'
        }
    }
  })
);

// const Routes = createAppContainer(createSwitchNavigator(
//     {
//       Login: Login,
//       Feed: { screen: Feed, navigationOptions: { title: 'Feed' }},
//       PerfilUsuario: { screen: Feed, navigationOptions: { title: 'Perfil de Usuario' }}
//     },
//     {
//       initialRouteName: 'Login'
//     }
//   ))

export default Routes;