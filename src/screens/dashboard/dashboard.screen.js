import React, {Component} from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, Text, View, ScrollView, Switch, FlatList,TouchableOpacity} from "react-native";
import Colors from "../../constants/colors.constant";
import {ListTemp} from "../../components/listTemp.component";
import {convertToCelcius, convertToFahrenheit} from "../../helpers/util";

class DashboardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCelsius: true,
            isLoad: false,
            temps: [],
        }
    }

    componentDidMount(){
        // this.getTemperature();
    }


    getTemperature = async () =>{
        const {isLoad,temps} = this.state
        temps.push(0,1,2,3,45,6);
        this.setState({temps})
    }
    renderLoadTemps = () => {
        const {isLoad} = this.state;
        if (isLoad) {
            return (
                <View style={styles.containerTemps}>
                    {/*<ShimmerPlaceHolder autoRun={true}/>*/}
                    {/*<ShimmerPlaceHolder autoRun={true}/>*/}
                    {/*<ShimmerPlaceHolder autoRun={true}/>*/}
                </View>
            )

        }
        return (
            <TouchableOpacity onPress={this.getTemperature} style={styles.containerTempsError}>
                <Text>Não foi possivel carregar os dados</Text>
                <Text>clique aqui e tente Novamente</Text>
            </TouchableOpacity>)
    };

    render() {
        const {isCelsius, temps} = this.state;
        const tempsChoice = isCelsius ? convertToCelcius(temps) : convertToFahrenheit(temps)
        return (
            <View style={styles.container}>
                <ScrollView style={styles.wrap}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>São Paulo</Text>
                        <Text style={styles.title}>25°</Text>
                    </View>
                    <View style={styles.containerMap}>

                    </View>
                    <FlatList
                        data={tempsChoice}
                        style={styles.containerTemps}
                        renderItem={({item}) => <ListTemp/>}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                        scrollEventThrottle={16}
                        onEndReachedThreshold={0.1}
                        ListEmptyComponent={this.renderLoadTemps}
                    />
                </ScrollView>
                <View style={styles.containerOptions}>
                    <View style={styles.containerTextOptions}>
                        <Text style={[styles.titleOptions, (isCelsius ? styles.choiceOptions : null)]}>Celsius</Text>
                        <Text style={styles.titleOptions}>/</Text>
                        <Text
                            style={[styles.titleOptions, (!isCelsius ? styles.choiceOptions : null)]}>Fahrenheit</Text>
                    </View>
                    <Switch value={isCelsius} onValueChange={(value) => this.setState({isCelsius: value})}
                    />
                </View>
            </View>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLUE_LIGHT
    },
    wrap: {
        width: '97%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom:60
    },
    containerTitle: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 100,
    },
    title: {
        fontSize: 25
    },
    map: {
        width: '100%',
        height: '100%'
    },
    containerMap: {
        width: '100%',
        height: 140,
        backgroundColor: 'green',
        marginTop: 50
    },
    containerTemps: {
        width: '100%',
        height: 170,
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.GREY_LIGHT,
        backgroundColor:Colors.WHITE,
        borderRadius: 3
    },
    containerTempsError:{
        width: '100%',
        height: 170,
        justifyContent:'center',
        alignItems:'center'
    },
    containerOptions: {
        position: 'absolute',
        bottom: 0,
        width: '97%',
        height: 60,
        alignSelf: 'center',
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    containerTextOptions: {
        flexDirection: 'row',
    },
    choiceOptions: {
        fontWeight: 'bold',
        fontSize: 19
    },
    titleOptions: {
        fontSize: 18
    },


});

export default DashboardScreen