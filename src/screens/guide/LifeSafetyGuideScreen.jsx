import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LifeSafetyData from '../../assets/json/LifeSafety.json';

const screenHeight = Dimensions.get('window').height;

const LifeSafetyGuideScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '생활안전 행동 가이드',
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState('');

  const openModal = detail => {
    setSelectedDetail(detail);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDetail('');
  };

  return (
    <ScrollView style={styles.container}>
      {LifeSafetyData.map((section, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.category}</Text>
          {section.items.map((item, itemIdx) => (
            <TouchableOpacity
              key={itemIdx}
              style={styles.item}
              onPress={() => {
                if (item.detail.trim()) openModal(item.detail);
              }}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalText}>{selectedDetail}</Text>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f6f6f6',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
  },
  arrow: {
    fontSize: 18,
    color: '#aaa',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: screenHeight * 0.7,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
  },
});

export default LifeSafetyGuideScreen;
