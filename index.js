import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import Category from './components/Category';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import MyAccount from './components/MyAccount'

const Navigator = createStackNavigator({
  
  // MyAccount: {screen: MyAccount},
  // ProductList: { screen: ProductList },
  // ProductDetail: { screen: ProductDetail },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false} },
  ProductDetail: { screen: ProductDetail },
  Checkout: {screen: Checkout},
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);


const App = createAppContainer(Navigator);

export default App;