import React, { useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {

  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect( () => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const {coords} = await getCurrentPositionAsync({
          enablehighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
      }
    }

    loadInitialLocation();
  }, [])

  // se ainda não tem currentRegion renderiza nada
  if (!currentRegion) {
    return null;
  }

  return < MapView initialRegion={currentRegion} style={styles.map}/>
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
})

export default Main;