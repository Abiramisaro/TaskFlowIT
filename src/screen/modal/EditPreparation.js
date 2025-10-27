import React from 'react';
import { Text, View } from 'react-native';
import { RText } from '../../components';

const EditPreparation = ({
    params,
}) => (
    
);
<Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <RText content="Edit Step" style={styles.modalTitle} />
            <TextInput
              value={editStepText}
              onChangeText={setEditStepText}
              style={styles.modalInput}
              multiline
            />
            <View style={styles.modalButtons}>
              <RButton buttonText="Cancel" onPress={() => setEditModalVisible(false)} />
              <RButton buttonText="Save" onPress={handleSaveStep} />
            </View>
          </View>
        </View>
      </Modal>
export default EditPreparation;
