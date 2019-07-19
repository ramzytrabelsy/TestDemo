import React, {Component} from 'react'
import {
    ActivityIndicator, TouchableOpacity, FlatList,
    AppRegistry, SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Spinner from '../components/Spinner';
import ConfigApp from '../utils/ConfigApp';
import {connect} from "react-redux";


class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
    };

    componentDidMount() {
        this.GetAllUsers();
    }

    GetAllUsers = () => {

        this.setState({loading: true});
        fetch(ConfigApp.URL)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.users,
                    error: res.error || null,
                    loading: false,
                });
                this.props.PUSH_USERS(res.users)
                console.log(res)
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };


    GoToUserPublication(item) {
        console.log(item)
        //let name = item.firstname + " " + item.lastname;
        const navigationAction = NavigationActions.navigate({
            routeName: 'User_PublicationsScreen',
            params: {item}
        });
        this.props.navigation.dispatch(navigationAction);
        this.props.PUSH_User(item)

    }


    render() {
        const {loading, data} = this.state;
        return (

            <SafeAreaView style={{flex: 1}}>

                {(loading) &&
                <Spinner/>
                }

                {(!loading) &&
                <FlatList
                    data={this.props.Users_Data}
                    style={{width: '100%', height: '100%'}}
                    //data defined in constructor
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    //Item Separator View
                    renderItem={({item, index}) => (
                        // Single Comes here which will be repeatative for the FlatListItems
                        <View>
                            <Text
                                style={styles.item}
                                onPress={()=>this.GoToUserPublication(item)}>
                                {item.firstname + " " + item.lastname}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const mapStateToProps = (state) => {
    return {
        Users_Data: state.Users.Users_Data,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        PUSH_USERS: (data) => dispatch({type: 'PUSH_USERS', payload: data}),
        PUSH_User: (data) => dispatch({type: 'PUSH_User', payload: data}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)