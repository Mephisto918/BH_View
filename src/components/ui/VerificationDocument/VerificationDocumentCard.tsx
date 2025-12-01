import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface VerificationDocumentCardProps {}

export default function VerificationDocumentCard({}: VerificationDocumentCardProps) {
  return (
    <View style={s.container}>
      <Text>VerificationDocumentCard</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {},
});
