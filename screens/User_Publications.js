import React, { Component } from 'react'
import {
    ActivityIndicator, TouchableOpacity, FlatList,
    AppRegistry, SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";

class User_Publications extends Component {

    constructor(props) {
        super(props);

        const {params} = props.navigation.state
        this.state = {
            loading: false,
            data: [],
            error: null,
            item: params.item,
        };
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    GoToDetail(item) {
        console.log(item)
        const navigationAction = NavigationActions.navigate({
            routeName: 'DetailsScreen',
            params: {item}
        });
        this.props.navigation.dispatch(navigationAction);
        this.props.PUSH_Publications(item)

    }


    compareValues(key, order) {
      return function(a, b) {
        if(!a.hasOwnProperty(key) ||
           !b.hasOwnProperty(key)) {
          return 0;
        }

        const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order == 'desc') ?
          (comparison * -1) : comparison
        );
      };
    }

    componentDidMount() {
       const { item } = this.state;
        let array = this.props.User.publications.sort(this.compareValues('id','desc'))
        this.setState({
            data : array
        })

    }


    render() {
        const { item , data } =this.state;
       return (
           <View style={styles.container}>
               <Text style={{textAlign: 'center'}}>User_Publications : {item.id}</Text>

               <FlatList
                    data={data}
                    style={{width: '100%', height: '100%'}}
                    //data defined in constructor
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    //Item Separator View
                    renderItem={({item, index}) => (
                        // Single Comes here which will be repeatative for the FlatListItems
                        <View>
                            <Text
                                style={styles.item}
                                onPress={()=>this.GoToDetail(item)}>
                                {item.title}
                            </Text>
                            <Text onPress={()=>this.props.DELETE_PUBLICATION(item.id)}>delete</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

           </View>
       )
   }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center'
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
        User: state.Users.User,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        PUSH_Publications: (data) => dispatch({type: 'PUSH_Publications', payload: data}),
        DELETE_PUBLICATION: (id) => dispatch({type: 'DELETE_COMMANTAIRE', payload: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User_Publications)