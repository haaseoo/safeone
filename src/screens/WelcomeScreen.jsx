import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <TouchableOpacity onPress={() => navigation.navigate('MainHome')}>
        <Image
          source={require('../assets/img/safeone.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* 슬로건 & 앱명 */}
      <Text style={styles.slogan}>나를 지키는 첫 번째 습관</Text>
      <Text style={styles.appName}>안心ONE</Text>

      {/* 가입하기 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>

      {/* 로그인 텍스트 */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>이미 계정이 있어요</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 150,
  },
  slogan: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 60,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#F3F3F3',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 100,
    marginBottom: 16,
    width: 260,
    height: 45,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 12,
    color: '#EE5AA0',
    textDecorationLine: 'underline',
  },
});
