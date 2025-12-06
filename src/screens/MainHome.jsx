// src/screens/MainHome.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {Linking, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import safetyTips from '../assets/json/safetip.json';

const MainHome = () => {
  const navigation = useNavigation();
  const [helpActive, setHelpActive] = useState(false);

  const handleHelpToggle = () => {
    setHelpActive(prev => !prev);
  };

  // 안전팁
  const getTodayTip = () => {
    const today = new Date();
    const dayNumber =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const index = dayNumber % safetyTips.length;
    return safetyTips[index];
  };

  const todayTip = getTodayTip();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 로고 */}
        <Image
          source={require('../assets/img/logoKoreanVer.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>오늘의 안전팁</Text>
          <View style={styles.tipContent}>
            <View>
              <Text style={styles.tipText}>{todayTip.tip}</Text>
              <Text style={styles.tipSubText}>
                {'\n'}
                {todayTip.subtip} :)
              </Text>
            </View>
            <Image
              source={require('../assets/img/hechi.png')}
              style={styles.tipImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* 기능 버튼들 */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
            <Image
              source={require('../assets/img/guide.png')}
              style={styles.Image}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Challenge')}>
            <Image
              source={require('../assets/img/challenge.png')}
              style={styles.Image}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SafeMode')}>
            <Image
              source={require('../assets/img/safemode.png')}
              style={styles.Image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* 동네소식 */}
        <View style={styles.localNewsSection}>
          <Image
            source={require('../assets/img/localNews.png')}
            style={styles.localImage}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/img/localText.png')}
            style={styles.localLabel}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* 플로팅 도움 버튼 */}
      <TouchableOpacity
        style={[
          styles.floatingButton,
          helpActive && styles.floatingButtonActive,
        ]}
        onPress={handleHelpToggle}>
        <Image
          source={require('../assets/img/quick.png')}
          style={styles.floatingIcon}
        />
      </TouchableOpacity>

      {/* 도움말 오버레이 */}
      <Modal
        visible={helpActive}
        animationType="fade"
        transparent={true}
        onRequestClose={handleHelpToggle}>
        {helpActive && (
          <TouchableWithoutFeedback onPress={() => setHelpActive(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.emergencyCard}>
                  {[
                    {label: '112 - 범죄신고', number: '112'},
                    {label: '119 - 재난신고', number: '119'},
                    {label: '110 - 민원상담', number: '110'},
                    {label: '117 - 학교폭력', number: '117'},
                  ].map(item => (
                    <TouchableOpacity
                      key={item.number}
                      onPress={() => Linking.openURL(`tel:${item.number}`)}>
                      <Text style={styles.emergencyText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logoImage: {
    width: 85,
    marginLeft: 7,
  },
  tipBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 30,
    width: 330,
    height: 155,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: -10,
  },
  tipContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipSubText: {
    fontSize: 11,
    color: '#EE5AA0',
  },
  tipImage: {
    width: 120,
    height: 120,
    marginLeft: 10,
    marginTop: -5,
  },
  menuButton: {
    marginBottom: 0,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  Image: {
    width: 330,
    height: 50,
    marginBottom: 25,
  },
  localNewsSection: {
    flexDirection: 'row',
  },
  localImage: {
    width: 140,
    height: 150,
    borderRadius: 12,
  },
  localLabel: {
    width: 110,
    height: 34,
    marginLeft: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 120,
    height: 118,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  floatingButtonActive: {
    backgroundColor: '#fff',
  },
  floatingIcon: {
    width: 120,
    height: 120,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  emergencyCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '55%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 0},
  },
  emergencyText: {
    fontSize: 15,
    paddingVertical: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MainHome;
