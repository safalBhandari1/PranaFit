import React from 'react';
import { Modal, View, Text } from 'react-native';

const TestModal: React.FC = () => {
  console.log('🟢 TestModal - Component MOUNTED');
  
  return (
    <Modal visible={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Test Modal - If you see this, modal works!</Text>
      </View>
    </Modal>
  );
};

export default TestModal;