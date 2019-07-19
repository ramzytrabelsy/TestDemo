import React, { Component } from 'react'
import {
   ActivityIndicator,
   AppRegistry,
   StyleSheet,
   Text,
   View,
} from 'react-native'

export default class Spinner extends Component {
   render() {
       return (
           <View style={[styles.container, styles.horizontal]}>
               <ActivityIndicator size="large" color="#000" />

           </View>
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
   }
})