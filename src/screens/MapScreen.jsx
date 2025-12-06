import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '안심지도',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/image.png')}
        style={styles.map}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 393,
    // height: '100%',
    paddingBottom: 90,
  },
});

export default MapScreen;
