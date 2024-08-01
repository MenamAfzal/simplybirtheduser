import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../redux/actions';
import {COLORS} from '../constants';
import {normalize} from 'react-native-elements';

const TimeSlotPicker = ({
  isVisible,
  onClose,
  selectedDate,
  selectedCaregiver,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [meetingType, setMeetingType] = useState('consult');
  const dispatch = useDispatch();

  const available_slots = useSelector(
    state => state.dashReducer.available_slots,
  );

  const user = useSelector(state => state.authReducer?.loginData?.data?._id);
  const appointment_book = useSelector(
    state => state?.dashReducer?.appointment_book,
  );

  console.log('slotsbook------>', available_slots);
  console.log('book------>', appointment_book);

  function handleSlotSelection(slot) {
    setSelectedSlot(slot);
    const body = {
      userId: user,
      caregiverId: selectedCaregiver?._id,
      date: selectedDate,
      slot: slot,
    };
    console.log('slot selectionnnnn :', body);
    dispatch(AppActions.slot_lock(body));
  }

  function handleBookedSlot() {
    const data = {
      userId: user,
      caregiverId: selectedCaregiver?._id,
      date: selectedDate,
      slot: selectedSlot,
      meetingType: meetingType,
    };
    // Close the modal first
    onClose();
    // Then dispatch the appointment_book action
    dispatch(AppActions.appointment_book(data));
  }

  // Function to render each time slot item
  const renderTimeSlotItem = ({item}) => {
    const isSelected = selectedSlot === item;

    return (
      <TouchableOpacity
        style={[styles.slotItem, isSelected ? styles.selectedSlot : null]}
        onPress={() => handleSlotSelection(item)}>
        <Text
          style={[
            styles.slotText,
            isSelected ? styles.selectedSlotText : null,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => onClose()}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 13,
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'red',
                }}>
                Close
              </Text>
            </TouchableOpacity>
            <Text
              style={{alignSelf: 'center', fontSize: 16, fontWeight: '500'}}>
              Select your Time Slot
            </Text>
            {available_slots?.length == 0 ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 80,
                }}>
                <Text style={{fontWeight: '500', fontSize: 17}}>
                  No Slot Available on this Date
                </Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={available_slots}
                renderItem={renderTimeSlotItem}
                keyExtractor={item => item}
                contentContainerStyle={styles.timeSlotsList}
                numColumns={4}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => handleBookedSlot()}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: 350,
    maxWidth: '100%',
    margin: 3,
    paddingVertical: 20,
  },
  slotItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    padding: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 12,
    marginLeft: 12,
  },
  slotText: {
    fontSize: 12,
  },
  selectedSlot: {
    backgroundColor: COLORS.PRIMARY,
  },
  selectedSlotText: {
    fontSize: 12,
    color: 'white',
  },
  closeModalButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    margin: 16,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  timeSlotsList: {
    paddingBottom: 16,
  },
});

export default TimeSlotPicker;
