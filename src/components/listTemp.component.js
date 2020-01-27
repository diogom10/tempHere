import React from 'react';
import {Platform, Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import Colors from "../constants/colors.constant";
import Config from "../constants/config.constant";
import {convertDate, convertToFahrenheit} from "../helpers/util";

const sol = require('../assets/sol.png');

export const ListTemp = (props) => {
    const {data, isCelsius} = props;
    let {temperature,date,type} = data;
    date = convertDate(date);
    if(!isCelsius){
        temperature = convertToFahrenheit(temperature)
    }
    const image = {uri:`${Config.META_WEATHER_PNG}${type}.png`}
    return (
        <View style={styles.areaTemps}>
            <View style={styles.infoTemps}>
                <Text style={styles.titleTemps}>{date}</Text>
            </View>
            <View style={styles.infoTemps}>
                <Text style={styles.titleTemps}>{`${temperature}°`}</Text>
            </View>
            <View style={styles.infoTemps}>
                <Image resizeMode={'contain'} style={styles.image} source={image} />
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
        width: '50%',
        height: '50%'
    }
})
