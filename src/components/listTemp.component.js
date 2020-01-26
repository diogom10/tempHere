import React from 'react';
import {Platform, Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import Colors from "../constants/colors.constant";

const sol = require('../assets/sol.png');

export const ListTemp = (props) => {
    return (
        <View style={styles.areaTemps}>
            <View style={styles.infoTemps}>
                <Text style={styles.titleTemps}>22/05</Text>
            </View>
            <View style={styles.infoTemps}>
                <Text style={styles.titleTemps}>18°</Text>
            </View>
            <View style={styles.infoTemps}>
                <Image resizeMode={'contain'} style={styles.image} source={sol}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    areaTemps: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.GREY_LIGHT,
    },

    infoTemps: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTemps: {
        fontSize: 21
    },

    image: {
        width: '70%',
        height: '70%'
    }
})
