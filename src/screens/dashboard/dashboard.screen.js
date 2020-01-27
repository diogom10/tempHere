import React, {Component} from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleSheet, Text, View, ScrollView, Switch, FlatList, TouchableOpacity} from "react-native";
import Colors from "../../constants/colors.constant";
import {ListTemp} from "../../components/listTemp.component";
import {convertToCelcius, convertToFahrenheit} from "../../helpers/util";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import {fetchingWoeid} from "../../actions/dashboard.action";

class DashboardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCelsius: true,
            isLoad: true,
            dataTemperature: {
                city: '',
                nextTemperatures: [],
                temperature: '',
            }
        }
    }

    componentDidMount() {
        this.getTemperature();
    }

    /*this function search the temperature based on location and woeid*/
    getTemperature = async () => {
        const {location} = this.props;
        const data = await this.props.fetchingWoeid({...location});

        if (data.success) {
            const locationTemperature = data.payload[0];
            const {woeid} = locationTemperature;
            const {success, payload} = await this.props.fetchingTemperature(woeid);
            if (success) {
                console.log('payload', payload)
                this.setState({isLoad: false, dataTemperature: payload})
            }
        }
    };
    /*this function search the temperature based on location and woeid*/

    /*This function is responsible for showing a loader if the app is looking for the temperature or showing a message if an error occurs*/
    renderLoadTemps = () => {
        const {isLoad} = this.state;
        if (isLoad) {
            return (
                <View style={styles.containerTempsError}>
                    <ShimmerPlaceHolder style={styles.map} autoRun={true}/>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={this.getTemperature} style={styles.containerTempsError}>
                <Text>Não foi possivel carregar os dados</Text>
                <Text>clique aqui e tente Novamente</Text>
            </TouchableOpacity>)
    };

    /*This function is responsible for showing a loader if the app is looking for the temperature or showing a message if an error occurs*/

    /*This function render one point into mapview  */
    renderMapBoxPoint() {
        const {location} = this.props
        return (
            <MapboxGL.PointAnnotation
                id='home'
                coordinate={[location.lng,location.lat]}
            >
                <View style={styles.pointContainer}>
                    <View style={styles.pointFill}/>
                </View>
                <MapboxGL.Callout title='I am here'/>
            </MapboxGL.PointAnnotation>
        )
    }
    /*This function render one point into mapview  */

    render() {
        const {location} = this.props;
        const {isCelsius, dataTemperature, isLoad} = this.state;
        const {city, nextTemperatures, temperature} = dataTemperature;
        console.log(location);
        return (
            <View style={styles.container}>
                <ScrollView style={styles.wrap}>
                    {isLoad ? (
                            <View style={styles.containerTitleLoad}>
                                <ShimmerPlaceHolder style={styles.map} autoRun={true}/>
                            </View>) :
                        (
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>{city}</Text>
                                <Text style={styles.title}>{`${temperature}°`}</Text>
                            </View>
                        )}
                    <View>
                        <MapboxGL.MapView
                            zoomEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                            style={styles.containerMap}
                            showUserLocation
                            styleURL={MapboxGL.StyleURL.Dark}
                        >
                            <MapboxGL.Camera
                                zoomLevel={14}
                                centerCoordinate={[location.lng,location.lat]}
                            />
                            {this.renderMapBoxPoint()}
                        </MapboxGL.MapView>
                    </View>
                    <FlatList
                        data={nextTemperatures}
                        style={styles.containerTemps}
                        renderItem={({item, index}) => index > 0 ? <ListTemp data={item} isCelsius={isCelsius}/> : null}
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
        marginBottom: 60
    },
    containerTitle: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 100,
    },
    containerTitleLoad: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        overflow: 'hidden'
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
        backgroundColor: Colors.WHITE,
        borderRadius: 3
    },
    containerTempsError: {
        width: '100%',
        height: 170,
        justifyContent: 'center',
        alignItems: 'center'
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


    pointContainer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    pointFill: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: Colors.VIOLET,
        transform: [{scale: 0.8}],
    }
});

export default DashboardScreen