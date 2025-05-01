import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
        
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}
          enableDynamicSizing={false}
        >  

            <View style={{ padding: 20 }}>
              <Text>Hello from Bottom Sheet</Text>
            </View>
          </BottomSheet>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
