import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SafeModeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '안전 귀가 모드',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
      },
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerBackTitle: '',

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}>
          <Text
            style={{
              fontSize: 26,
              color: '#0',
              fontWeight: '300',
              marginTop: -10,
            }}>
            {'‹'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>안전귀가 모드 실행</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SafeModeScreen;
