// TestModal.tsx
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

export default function TestModal() {
  const [visible, setVisible] = React.useState(true);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'red',        // ← MUST SEE RED
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'white', fontSize: 30 }}>
          IF YOU SEE THIS, FLEX WORKS
        </Text>
        <Button title="Close" onPress={() => setVisible(false)} />
      </View>
    </Modal>
  );
}