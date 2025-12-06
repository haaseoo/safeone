import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';
import {signUpUser} from '../firebase/authService';

const SignUpScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '회원가입',
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [pwValid, setPwValid] = useState(true);
  const [region, setRegion] = useState('');

  const isAllFilled = name && email && pw && pwCheck && region;
  const isPwMatch = pw === pwCheck;
  const showPwError = pwCheck.length > 0 && !isPwMatch;

  const handleNameChange = text => {
    const koreanOnly = text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    setName(koreanOnly.slice(0, 5));
  };

  const handleEmailChange = text => {
    setEmail(text.trim());
  };

  const validatePassword = pw => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return regex.test(pw);
  };

  const handlePwChange = text => {
    const noKorean = text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    setPw(noKorean);
    setPwValid(validatePassword(noKorean));
  };

  const handleSignUp = async () => {
    const result = await signUpUser(email, pw); // ← name, region 없이

    if (result.success) {
      Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다.');
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('회원가입 실패', result.message);
    }
  };

  const districtData = [
    {key: 1, label: '강남구'},
    {key: 2, label: '강동구'},
    {key: 3, label: '강북구'},
    {key: 4, label: '강서구'},
    {key: 5, label: '관악구'},
    {key: 6, label: '광진구'},
    {key: 7, label: '구로구'},
    {key: 8, label: '금천구'},
    {key: 9, label: '노원구'},
    {key: 10, label: '도봉구'},
    {key: 11, label: '동대문구'},
    {key: 12, label: '동작구'},
    {key: 13, label: '마포구'},
    {key: 14, label: '서대문구'},
    {key: 15, label: '서초구'},
    {key: 16, label: '성동구'},
    {key: 17, label: '성북구'},
    {key: 18, label: '송파구'},
    {key: 19, label: '양천구'},
    {key: 20, label: '영등포구'},
    {key: 21, label: '용산구'},
    {key: 22, label: '은평구'},
    {key: 23, label: '종로구'},
    {key: 24, label: '중구'},
    {key: 25, label: '중랑구'},
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, name ? styles.inputFilled : null]}
        placeholder="이름"
        value={name}
        onChangeText={handleNameChange}
        maxLength={5}
      />

      <TextInput
        style={[styles.input, email ? styles.inputFilled : null]}
        placeholder="이메일"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[
          styles.input,
          pw.length === 0
            ? null
            : pwValid
            ? styles.inputFilled
            : styles.inputError,
        ]}
        placeholder="비밀번호"
        secureTextEntry
        value={pw}
        onChangeText={handlePwChange}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {pw.length > 0 && !pwValid && (
        <Text style={styles.errorText}>
          8자 이상, 영어+숫자+특수문자를 포함해야 해요.
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          pwCheck
            ? showPwError
              ? styles.inputError
              : styles.inputFilled
            : null,
        ]}
        placeholder="비밀번호 확인하기"
        value={pwCheck}
        onChangeText={setPwCheck}
        secureTextEntry
      />

      <ModalSelector
        data={districtData}
        initValue="지역 선택하기"
        onChange={option => setRegion(option.label)}
        style={styles.modalSelect}
        initValueTextStyle={
          region ? styles.dropdownText : styles.dropdownPlaceholder
        }
        selectTextStyle={styles.dropdownText}
      />

      {region !== '' && (
        <Text style={styles.selectedText}>선택된 구: {region}</Text>
      )}

      <TouchableOpacity
        onPress={handleSignUp}
        style={[
          styles.button,
          isAllFilled && isPwMatch ? styles.buttonActive : null,
        ]}
        disabled={!(isAllFilled && isPwMatch)}>
        <Text
          style={[
            styles.buttonText,
            isAllFilled && isPwMatch ? styles.buttonTextActive : null,
          ]}>
          가입하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  modalSelect: {
    borderColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  selectedText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
  },
});
export default SignUpScreen;
