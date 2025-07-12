import { StyleSheet, Alert, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import {
  Button as ButtonGL,
  Alert as AlertGL,
  HStack,
  View,
  Input,
  Box,
  FormControl,
  Heading,
  ScrollView,
  Text,
  VStack,
  InputField,
  Checkbox,
  CheckboxLabel,
  CheckboxIndicator,
  CheckboxIcon,
} from "@gluestack-ui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import Markdown from "react-native-awesome-markdown";
import { textMD } from "./TermsAndConditions";

// api
import Api from "@/services/apiEndpoints";

// UI layout
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

// UI Component
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

// Global Styles
import {
  BorderRadius,
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
} from "@/constants";

// routing
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Owner } from "@/stores/owners/owners.types";
import { useCreateMutation as useCreateTenant } from "@/stores/owners/owners";

const SignUpOwnerScreen = () => {
  const route =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [form, setForm] = useState<Owner>({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    age: 0,
    address: "",
    phone_number: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<{
    value: string;
    isTrue: boolean;
  }>({ value: "", isTrue: false });
  const [createOwner, { isLoading: isCreating, error: createError }] =
    useCreateTenant();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit() {
    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        Alert.alert("Missing Field", `Please fill in the ${key}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters");
      return;
    }
    if (form.password !== confirmPassword.value) {
      Alert.alert("Alert", "Password and Confirm Password must match");
      return;
    }

    if (hasAcceptedTerms !== true) {
      return Alert.alert(
        "You must accept the Terms and Conditions to create an account!"
      );
    }

    try {
      const result = await createOwner(form).unwrap();
      console.log("result", result);

      Alert.alert("You are registered!");
      setForm({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        age: 0,
        address: "",
        phone_number: "",
      });
      setConfirmPassword({ value: "", isTrue: false });
      route.navigate("LoginScreen");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.details);
    }
  }

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsModal, setTermsModal] = useState(false);

  // const [pdfItems, setPdfItems] = useState<PDFItemProps[]>([]);
  // const [pdfName, setPdfName] = useState("");
  // function generateFakePDFJson(filename: string) {
  //   const fakeContent = Array.from({ length: 10 }, () =>
  //     Math.random().toString(36).substring(2, 10)
  //   ).join('');

  //   return {
  //     filename,
  //     mimetype: "application/pdf",
  //     size: Math.floor(Math.random() * 50000) + 10000, // size in bytes
  //     content: fakeContent, // can be seen as fake base64
  //     uploadedAt: new Date().toISOString()
  //   };
  // }

  // const createPDFItem = () =>{
  //   const pdfItem = generateFakePDFJson(pdfName);
  //   setPdfItems(prev => [...prev, pdfItem]);
  //   setPdfName("");
  // }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[
        GlobalStyle.GlobalsContentContainer,
        { justifyContent: "center", alignContent: "stretch" },
      ]}
    >
      <View style={[s.container, { marginBottom: 100, marginTop: 100 }]}>
        <View>
          <Text
            style={{
              color: Colors.TextInverse[1],
              fontSize: Fontsize.h1,
            }}
          >
            Owner Application Form
          </Text>
        </View>
        <View>
          {[
            "username",
            "firstname",
            "lastname",
            "email",
            "age",
            "address",
            "phone_number",
          ].map((field) => (
            <View key={field}>
              <Text
                style={{
                  fontSize: Fontsize.base,
                  color: Colors.TextInverse[1],
                  padding: Spacing.sm,
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Text>
              <TextInput
                value={form[field as keyof typeof form]}
                onChangeText={(text) => handleChange(field, text)}
                variant="primary"
                textInputStyle={{
                  fontSize: Fontsize.base,
                  padding: Spacing.xs,
                  margin: 0,
                }}
                containerStyle={{
                  borderRadius: BorderRadius.md,
                }}
              />
            </View>
          ))}
          <View style={{ width: "100%", padding: 10 }}></View>
          <FormControl>
            <FormControl.Label>
              <Text style={[s.FormLabel]}>Password</Text>
            </FormControl.Label>
            <Input>
              <InputField
                value={form.password}
                onChangeText={(text: string) =>
                  setForm({ ...form, password: text })
                }
                style={[s.FormTextInput]}
                secureTextEntry={true}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text style={[s.FormLabel]}>Confirm Password</Text>
            </FormControl.Label>
            <Input>
              <InputField
                value={confirmPassword.value}
                onChangeText={(text: string) =>
                  setConfirmPassword({ ...confirmPassword, value: text })
                }
                style={[s.FormTextInput]}
                secureTextEntry={true}
              />
            </Input>
          </FormControl>
        </View>
        <VStack>
          <Checkbox
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              gap: 10,
            }}
            isChecked={hasAcceptedTerms}
            onPress={() => setTermsModal(true)}
            value="accepted"
          >
            <CheckboxIndicator style={{ aspectRatio: 1, height: 100 }}>
              <CheckboxIcon
                as={() => (
                  <Ionicons
                    name={hasAcceptedTerms ? "checkmark" : "checkmark-outline"}
                    color={"black"}
                  />
                )}
              />
            </CheckboxIndicator>
            <CheckboxLabel style={{ color: Colors.TextInverse[1] }}>
              I agree to the Terms and Conditions
            </CheckboxLabel>
          </Checkbox>
          <HStack style={{ marginTop: 10 }}>
            <Button
              title="Cancel"
              onPressAction={() => {
                route.navigate("SignUpSelectUserTypeScreen");
              }}
              containerStyle={{
                backgroundColor: Colors.Alert,
              }}
            />
            <Button title="Create" onPressAction={handleSubmit} />
          </HStack>
        </VStack>
      </View>
      {termsModal && (
        <AlertGL
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <VStack
            style={{
              gap: Spacing.lg,
              alignItems: "stretch",
              width: "90%",
              padding: Spacing.lg,
              borderRadius: BorderRadius.md,
              backgroundColor: Colors.PrimaryLight[7],
            }}
          >
            <Heading>
              <Text style={[s.Text, { fontSize: Fontsize.h1 }]}>
                Terms and Services
              </Text>
            </Heading>
            <ScrollView>
              <Markdown styles={customStyles} text={textMD} />
            </ScrollView>
            <VStack>
              <Button
                variant="primary"
                onPressAction={() => {
                  setTermsModal(false);
                  setHasAcceptedTerms(false);
                }}
              >
                <Text style={[s.TextButton]}>
                  I Do Not Accept the Terms and Services
                </Text>
              </Button>
              <Button
                variant="primary"
                onPressAction={() => {
                  setTermsModal(false);
                  setHasAcceptedTerms(true);
                }}
              >
                <Text style={[s.TextButton]}>
                  I Accept the Terms and Services
                </Text>
              </Button>
            </VStack>
          </VStack>
        </AlertGL>
      )}
    </StaticScreenWrapper>
  );
};

const s = StyleSheet.create({
  StaticScreenWrapper: {
    backgroundColor: Colors.PrimaryLight[8],
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  Text: {
    color: "white",
  },
  TextButton: {
    color: "black",
  },
  FormLabel: {
    fontSize: Fontsize.base,
    color: Colors.TextInverse[1],
    padding: Spacing.sm,
  },
  FormTextInput: {
    fontSize: Fontsize.base,
    padding: Spacing.xs,
    backgroundColor: Colors.PrimaryLight[2],
    margin: 0,
  },
});

const customStyles = {
  paragraph: { color: "white" },
  h1: { color: "white" },
  h2: { color: "white" },
  h3: { color: "white" },
  h4: { color: "white" },
  h5: { color: "white" },
  h6: { color: "white" },
  link: { color: "white", textDecorationLine: "underline" },
  blockquote: { color: "white", fontStyle: "italic" },
  list: { color: "white" },
  strong: { color: "white" },
  em: { color: "white" },
  code: { color: "white", backgroundColor: "#333" },
};

export default SignUpOwnerScreen;

// username TEXT UNIQUE NOT NULL,
// firstname TEXT NOT NULL,
// lastname TEXT NOT NULL,
// email TEXT UNIQUE NOT NULL,
// password TEXT NOT NULL,
// age INTEGER CHECK (age >= 0),              -- optional, but must be a non-negative number
// address TEXT,                                -- optional, full address
// phone_number TEXT
