import {createAppContainer, createStackNavigator} from 'react-navigation';

import Users from '../screens/Users';
import User_Publications from '../screens/User_Publications';
import Details from '../screens/Details';


const AppNavigation = createStackNavigator({

    UsersScreen: {
        screen: Users,
        // navigationOptions: ({navigation}) => ({
        //     header: null
        // })
    },
    User_PublicationsScreen: {
        screen: User_Publications,
        // navigationOptions: ({navigation}) => ({
        //     header: null
        // })
    },
    DetailsScreen: {
        screen: Details,
        // navigationOptions: ({navigation}) => ({
        //     header: null
        // })
    }
});

const AppContainer = createAppContainer(AppNavigation);

// Now AppContainer is the main component for React to render

export default AppContainer;