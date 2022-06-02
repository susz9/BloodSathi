import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { PageTitle, StyledContainer } from '../../Components/Styles';
import MapView from 'react-native-maps';

//location from expo
import * as Location from 'expo-location';

const height = Dimensions.get('window').height;

const response = [
  {
    id: '1',
    coordinates: {
      latitude: 26.650629926300663,
      longitude: 87.30439061483534,
    },
    title: 'Health Post Office',
    description: 'Health Post Office शहरी स्वास्थ्य केन्द्र',
  },
  {
    id: '2',
    coordinates: {
      latitude: 26.669404930515473,
      longitude: 87.3093385340807,
    },
    title: 'Sundarpur Health Post',
    description: 'Sundarpur Health Post',
    category: 1,
  },
  {
    id: '3',
    coordinates: {
      latitude: 26.661913829607744,
      longitude: 87.27929795804998,
    },
    title: 'Itahari hospital',
    description: 'Itahari hospital',
    category: 1,
  },
  {
    id: '4',
    coordinates: {
      latitude: 26.661994664954562,
      longitude: 87.27925424539026,
    },
    title: 'City Health Services',
    description: 'City Health Services (P) Ltd.',
    category: 1,
  },
  {
    id: '5',
    coordinates: {
      latitude: 26.664836291534993,
      longitude: 87.2658645172663,
    },
    title: 'Apex Hospital',
    description: 'Apex Hospital',
    category: 1,
  },
  {
    id: '6',
    coordinates: {
      latitude: 26.659588181051497,
      longitude: 87.27322712212624,
    },
    title: 'Itahari Primary Health Center',
    description: 'Itahari Primary Health Center',
    category: 1,
  },
  {
    id: '7',
    coordinates: {
      latitude: 26.65930618614542,
      longitude: 87.27450681292797,
    },
    title: 'Government hospital',
    description: 'Government hospital',
    category: 1,
  },
  {
    id: '8',
    coordinates: {
      latitude: 26.659573319229104,
      longitude: 87.27533719985335,
    },
    title: 'Pashupati Model Hospital and Research Centre',
    description: 'Pashupati Model Hospital and Research Centre',
    category: 1,
  },
];

const Maps = () => {
  const [coordinates, setCoordinates] = useState('');

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={false}
        region={{
          latitude: 26.655623401446192,
          longitude: 87.30188834342773,
          latitudeDelta: 0.15,
          longitudeDelta: 0.05,
        }}
      >
        {response.map((marker) => (
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
          >
            <Image source={require('./../../assets/Icons/LocationPin.png')} style={{ height: 32, width: 32 }} />
          </MapView.Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

// latitude: 26.665295,
//       longitude: 87.365264,
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height,
  },
});

export default Maps;
