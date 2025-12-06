import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const ProfileEditScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [region, setRegion] = useState('');

  const seoulDistricts = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필 수정',
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름 입력"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="010-0000-0000"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>아이디</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={userId}
        onChangeText={setUserId}
      />

      <Text style={styles.label}>비밀번호</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.inputInner}
          placeholder="비밀번호"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eyeButton}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>나의 지역</Text>
      {/* <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={region}
          onValueChange={itemValue => setRegion(itemValue)}>
          <Picker.Item label="구 선택" value="" />
          {seoulDistricts.map(gu => (
            <Picker.Item key={gu} label={gu} value={gu} />
          ))}
        </Picker>
      </View> */}

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007aff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputInner: {
    flex: 1,
    height: 45,
  },
  iconWrapper: {
    paddingHorizontal: 5,
  },
  eyeButton: {
    fontSize: 18,
  },
});

export default ProfileEditScreen;
