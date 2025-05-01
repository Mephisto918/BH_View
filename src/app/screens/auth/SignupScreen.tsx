import React, { useMemo, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { BottomSheetView } from 'react-native-gesture-handler';

export default function SignupScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const open = () =>{
    console.log('open')
    console.log(bottomSheetRef)
    bottomSheetRef.current?.snapToIndex(0)
  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 20 }}>SignupScreen</Text>
        <Button
          title="Open Bottom Sheet"
          onPress={open} // Open at 25%
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Hidden by default
          snapPoints={snapPoints}
          enablePanDownToClose
          // enableDynamicSizing={false}
          backgroundStyle={{ backgroundColor: 'white' }} // <-- important
        >
          <BottomSheetView style={{ padding: 20 }}>
            <Text>This is your bottom sheet content.</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </BottomSheetModalProvider>
  );
}
