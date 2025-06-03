import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  bottomOffset?: number;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
}

const StaticScreenWrapper = ({
  children,
  style,
  bottomOffset = 0,
  scrollEnabled = true,
  keyboardShouldPersistTaps = 'handled',
  showsVerticalScrollIndicator = true,
  contentContainerStyle,
}: Props) => {
  return (
    <KeyboardAwareScrollView
      style={[styles.container, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      enableOnAndroid={true}
      extraScrollHeight={20}
      extraHeight={bottomOffset}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StaticScreenWrapper;
