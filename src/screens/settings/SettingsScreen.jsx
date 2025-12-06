import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Section = ({title, items, screens}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.item}
          onPress={() => navigation.navigate(screens[idx])}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();

  // 상단바 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경설정',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
      },
      headerStyle: {
        backgroundColor: '#F5F5F5',
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileRow}>
        <Image
          source={require('/Users/anhaseo/safeone/src/assets/img/exprofile.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>안하서</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
            <Text style={styles.profileEdit}>내 정보 수정하기 › </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Section
        title="인증 및 보안"
        items={['안전 알림 수신', '리마인더 알림 수신']}
        screens={['AlertSetting', 'ReminderSetting']}
      />
      <Section
        title="위치 및 권한"
        items={['위치 공유 설정', '앱 권한 안내']}
        screens={['LocationShare', 'PermissionInfo']}
      />
      <Section
        title="긴급 대응 설정"
        items={['SOS 연락처 관리', '긴급 연락처 관리']}
        screens={['SosContact', 'EmergencyContact']}
      />
      <Section
        title="고객지원 및 정보"
        items={['자주 묻는 질문', '1:1 문의']}
        screens={['Faq', 'Inquiry']}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 15,
    padding: 10,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileEdit: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    marginHorizontal: 26,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 22,
    color: '#000',
  },
  item: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    color: '#303030',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});

export default SettingsScreen;
