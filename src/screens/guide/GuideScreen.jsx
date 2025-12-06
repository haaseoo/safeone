import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GuideScreen = () => {
  const navigation = useNavigation();

  const items = [
    '자연재해 행동 가이드',
    '범죄 ∙ 사기 행동 가이드',
    '교통질서 행동 가이드',
    '보건 ∙ 응급처치 행동 가이드',
    '생활안전 행동 가이드',
    '환경 행동 가이드',
    '주거 행동 가이드',
  ];

  const screens = [
    'DisasterGuide',
    'CrimeGuide',
    'TrafficGuide',
    'HealthGuide',
    'LifeSafetyGuide',
    'EnvironmentGuide',
    'HousingGuide',
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '위급 행동 가이드',
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <View style={styles.list}>
        {items.map((label, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.button}
            onPress={() => navigation.navigate(screens[idx])}>
            <Text style={styles.buttonText}>{label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={styles.psText}>더 다양한 행동요령을 준비중이에요!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 20,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 22,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '400',
  },
  arrow: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: '400',
  },
  psText: {
    marginHorizontal: 110,
    fontSize: 12,
    fontWeight: '350',
    color: '#EE5AA0',
  },
});

export default GuideScreen;
