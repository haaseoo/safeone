import React, {useLayoutEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '로그인',
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
              color: '#000',
              fontWeight: '300',
              marginTop: -10,
            }}>
            {'‹'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const {setIsLoggedIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showError, setShowError] = useState(false);
  const [pwValid, setPwValid] = useState(true);

  const isFilled = email && pw;

  const handleLogin = () => {
    const dummyEmail = 'test@safeone.com';
    const dummyPw = 'Test1234!';

    if (email !== dummyEmail || pw !== dummyPw) {
      setShowError(true);
    } else {
      setShowError(false);
      setIsLoggedIn(true); // 로그인 상태 true로 변경
    }
  };

  const handleEmailChange = text => {
    setEmail(text.trim());
  };

  const handlePwChange = text => {
    setPw(text);
    setPwValid(validatePassword(text));
  };

  const validatePassword = pw => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return regex.test(pw);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          showError ? styles.inputError : email ? styles.inputFilled : null,
        ]}
        placeholder="이메일"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[
          styles.input,
          showError ? styles.inputError : pw ? styles.inputFilled : null,
        ]}
        placeholder="비밀번호"
        secureTextEntry
        value={pw}
        onChangeText={handlePwChange}
      />

      {pw.length > 0 && !pwValid && (
        <Text style={styles.errorText}>
          8자 이상, 영어+숫자+특수문자를 포함해야 해요.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, isFilled ? styles.buttonActive : null]}
        disabled={!isFilled}
        onPress={handleLogin}>
        <Text
          style={[
            styles.buttonText,
            isFilled ? styles.buttonTextActive : null,
          ]}>
          로그인하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 14,
    color: '#000',
  },
  inputFilled: {
    borderBottomColor: '#111',
    color: '#000',
  },
  inputError: {
    borderBottomColor: '#EE5AA0',
    color: '#EE5AA0',
  },
  button: {
    position: 'absolute',
    left: 67,
    top: 650,
    width: 259,
    height: 48,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#EE5AA0',
  },
  buttonText: {
    fontSize: 14,
    color: '#aaa',
  },
  buttonTextActive: {
    color: '#fff',
  },
  errorText: {
    fontSize: 12,
    color: '#EE5AA0',
    marginTop: -12,
    marginBottom: 8,
  },
});
