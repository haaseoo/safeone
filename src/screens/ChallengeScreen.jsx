import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  getWeek,
  getMonth,
  startOfWeek,
  addDays,
  addWeeks,
  format,
} from 'date-fns';

const getWeekDates = (offset = 0) => {
  const baseDate = addWeeks(new Date(), offset);
  const start = startOfWeek(baseDate, {weekStartsOn: 1});
  const daysKor = ['월', '화', '수', '목', '금', '토', '일'];

  return Array.from({length: 7}, (_, i) => {
    const date = addDays(start, i);
    return {
      day: daysKor[i],
      date: format(date, 'd'),
    };
  });
};

const getWeekLabel = (offset = 0) => {
  const baseDate = addWeeks(new Date(), offset);
  const start = startOfWeek(baseDate, {weekStartsOn: 1});
  const month = getMonth(start) + 1;
  const firstDayOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
  const firstWeek = getWeek(firstDayOfMonth);
  const currentWeek = getWeek(start);
  const weekOfMonth = currentWeek - firstWeek + 1;

  return `${month}월 ${weekOfMonth}주차`;
};

const ChallengeScreen = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekLabel = getWeekLabel(weekOffset);
  const weekDates = getWeekDates(weekOffset);

  const [challengeList, setChallengeList] = useState([
    {
      title: '외출 시 문단속',
      color: '#EC5A9B',
      records: ['O', 'O', 'O', 'O', 'O', 'X', 'X'],
    },
    {
      title: '가스밸브 점검',
      color: '#3CA9E2',
      records: ['O', 'O', 'X', 'X', 'X', 'X', 'X'],
    },
    {
      title: '문어발 콘센트 방지',
      color: '#A4C390',
      records: ['O', 'O', 'X', 'O', 'O', 'O', 'X'],
    },
    {
      title: '출입문 CCTV 확인',
      color: '#F9AF77',
      records: ['O', 'X', 'X', 'O', 'X', 'O', 'O'],
    },
  ]);

  const navigation = useNavigation();

  const toggleCheck = (rowIndex, colIndex) => {
    setChallengeList(prev =>
      prev.map((item, i) =>
        i === rowIndex
          ? {
              ...item,
              records: item.records.map((v, j) =>
                j === colIndex ? (v === 'O' ? 'X' : 'O') : v,
              ),
            }
          : item,
      ),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '안전 습관 챌린지',
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
      <View style={styles.list}>
        <View style={styles.checkBox}>
          <Text style={styles.checkTitle}>출석체크</Text>

          {/* 이전주 / 다음주 이동 */}
          <View style={styles.weekNavRow}>
            <TouchableOpacity onPress={() => setWeekOffset(prev => prev - 1)}>
              <Text style={styles.weekNav}>{'‹'}</Text>
            </TouchableOpacity>

            <Text style={styles.weekLabel}>{weekLabel}</Text>

            <TouchableOpacity onPress={() => setWeekOffset(prev => prev + 1)}>
              <Text style={styles.weekNav}>{'›'}</Text>
            </TouchableOpacity>
          </View>

          {weekOffset !== 0 && (
            <TouchableOpacity
              onPress={() => setWeekOffset(0)}
              style={styles.resetButton}>
              <Text style={styles.resetButtonText}>오늘로</Text>
            </TouchableOpacity>
          )}

          <View style={styles.rowCenter}>
            {weekDates.map((d, i) => (
              <Text key={i} style={styles.labelText}>
                {d.day}
              </Text>
            ))}
          </View>

          <View style={styles.rowCenter}>
            {weekDates.map((d, i) => (
              <Text key={i} style={styles.labelText}>
                {d.date}
              </Text>
            ))}
          </View>

          {challengeList.map((item, rowIndex) => (
            <View key={rowIndex} style={{marginTop: 25}}>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <View style={styles.rowCenter}>
                {item.records.map((val, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => toggleCheck(rowIndex, colIndex)}>
                    <Text
                      style={[
                        styles.checkText,
                        {color: val === 'O' ? item.color : '#ccc'},
                      ]}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>나만의 챌린지 생성</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>코인</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
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
  checkBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 30,
    width: 330,
    alignSelf: 'center',
  },
  checkTitle: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  weekNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekNav: {
    fontSize: 20,
    color: '#666',
    paddingHorizontal: 8,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#999',
    width: 30,
    textAlign: 'center',
  },
  checkText: {
    fontSize: 16,
    fontWeight: '600',
    width: 30,
    textAlign: 'center',
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 4,
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
  weekLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  resetButton: {
    alignSelf: 'center',
    marginTop: 4,
  },
  resetButtonText: {
    fontSize: 12,
    color: '#fac1c4',
    marginBottom: 10,
    // textDecorationLine: 'underline',
  },
});

export default ChallengeScreen;
