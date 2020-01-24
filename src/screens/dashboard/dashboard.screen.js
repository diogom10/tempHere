import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import Colors from "../../constants/colors.constant";


class DashboardScreen extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props)

        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrap}>
                    <View style={styles.ContainerTitle}>
                        <Text>São Paulo</Text>
                        <Text>25°</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrap: {
        backgroundColor: 'red',
        width: '97%',
        alignSelf: 'center',
    },
    ContainerTitle: {
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        minHeight:80,
        marginTop:20
    }
});

export default DashboardScreen