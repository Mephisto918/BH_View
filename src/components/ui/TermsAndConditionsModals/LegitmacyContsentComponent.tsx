import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import {
  Button,
  VStack,
  Checkbox,
  CheckboxLabel,
  CheckboxIndicator,
  CheckboxIcon,
} from "@gluestack-ui/themed";
import { BorderRadius, Colors, Fontsize, Spacing } from "@/constants";
import BHHunterOwnerLegitimacyConsent from "@/data/BHHunterOwnerLegitimacyConsent";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

interface LegitmacyContsentComponentProps {
  value: boolean; // controlled state
  onChange: (val: boolean) => void; // event to parent
}

export default function LegitmacyContsentComponent({
  onChange,
  value,
}: LegitmacyContsentComponentProps) {
  const [termsModal, setTermsModal] = React.useState(false);

  return (
    <View>
      <Checkbox
        value="accepted"
        isChecked={value}
        onPress={() => setTermsModal(true)} // open modal
      >
        <CheckboxIndicator style={{ aspectRatio: 1, height: 30 }}>
          <CheckboxIcon
            as={() => (
              <Ionicons
                name={value ? "checkmark" : "checkmark-outline"}
                color="black"
              />
            )}
          />
        </CheckboxIndicator>
        <CheckboxLabel style={{ color: Colors.TextInverse[1] }}>
          I agree to the Terms and Conditions
        </CheckboxLabel>
      </Checkbox>

      {/* React Native Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModal}
        onRequestClose={() => setTermsModal(false)}
      >
        <View style={s.modalOverlay}>
          <VStack style={s.modalContent}>
            <Text style={[s.Text, { fontSize: Fontsize.h1 }]}>
              Terms and Services
            </Text>

            <ScrollView style={{ maxHeight: 400 }}>
              <Markdown style={customStyles}>
                {BHHunterOwnerLegitimacyConsent}
              </Markdown>
            </ScrollView>

            <VStack style={{ gap: Spacing.md }}>
              <Button
                onPress={() => {
                  setTermsModal(false);
                  onChange(false);
                }}
              >
                <Text style={{ color: "white" }}>I Do Not Accept</Text>
              </Button>

              <Button
                onPress={() => {
                  setTermsModal(false);
                  onChange(true);
                }}
              >
                <Text style={{ color: "white" }}>I Accept</Text>
              </Button>
            </VStack>
          </VStack>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  Text: {
    color: Colors.TextInverse[2],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.PrimaryLight[7],
    gap: Spacing.lg,
  },
});

const customStyles = {
  body: { color: "white" },
  paragraph: { color: "white", lineHeight: 20 },
  heading1: { color: "white", fontSize: 24 },
  heading2: { color: "white", fontSize: 22 },
  heading3: { color: "white", fontSize: 20 },
  heading4: { color: "white", fontSize: 18 },
  heading5: { color: "white", fontSize: 16 },
  heading6: { color: "white", fontSize: 14 },
  link: { color: "white", textDecorationLine: "underline" },
  blockquote: { color: "white", fontStyle: "italic" },
  list_item: { color: "white" },
  strong: { color: "white", fontWeight: "bold" },
  em: { color: "white", fontStyle: "italic" },
  code_inline: { color: "white", backgroundColor: "#333" },
  code_block: { color: "white", backgroundColor: "#333" },
};
