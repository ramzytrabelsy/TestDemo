import React, {Component} from 'react'
import {
    ActivityIndicator, TouchableOpacity, FlatList,
    AppRegistry, SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {connect} from "react-redux";

class Details extends Component {

    constructor(props) {
        super(props);

        const {params} = props.navigation.state
        this.state = {
            item: params.item,
        };
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    render() {
        const {item} = this.state;
        console.log('/***')
        console.log(item)
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>{"Username : "  + this.props.User.firstname + " " + this.props.User.lastname}</Text>
                <Text style={{textAlign: 'center'}}>{"title : "  + this.props.Publications.title}</Text>
                <Text style={{textAlign: 'center'}}>{"body : "  + this.props.Publications.body}</Text>

                <FlatList
                    data={this.props.User.commentaires}
                    style={{width: '100%', height: '100%'}}
                    //data defined in constructor
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    //Item Separator View
                    renderItem={({item, index}) => (
                        // Single Comes here which will be repeatative for the FlatListItems
                        <View style={{flexDirection: 'row',marginTop : 50}}>
                            <Text
                                style={styles.item}
                                onPress={()=>console.log('ok')}>
                                {this.props.User.firstname + " " + this.props.User.lastname + " : "}
                            </Text>

                            <Text>
                                {item.body}
                            </Text>
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
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

const mapStateToProps = (state) => {
    return {
        User: state.Users.User,
        Publications : state.Users.Publications

    }
}




export default connect(mapStateToProps, null)(Details)