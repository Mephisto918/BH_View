import { StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";

import {
  Alert as AlertGL,
  HStack,
  Input,
  Box,
  FormControl,
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
import { textMD } from "../../TermsAndConditions";

// ui
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

// UI components
import Button from "@/components/ui/Button";

// Global Styles
import {
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
  BorderRadius,
} from "@/constants";

// routing
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/auth.stack.types";

// api
import { Heading } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";

// redux
import { useCreateMutation as useCreateTenant } from "@/infrastructure/tenants/tenant.redux.slice";
import { Tenant } from "@/infrastructure/tenants/tenant.types";

export default function SignUpTenantScreen(){
  // const api = new Api();
  const route = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // const [loading, setLoading] = React.useState(false);
  const [tenantForm, setTenantForm] = useState<Tenant>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: 0,
    guardian: "",
    address: "",
    phone_number: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<{
    value: string;
    isTrue: boolean;
  }>({ value: "", isTrue: false });
  const [createTenant, { isLoading: isCreating, error: createError }] =
    useCreateTenant();

  const handleFormSubmit = async () => {
    for (const [key, value] of Object.entries(tenantForm)) {
      if (!value.trim()) {
        Alert.alert("Missing Field", `Please fill in the ${key}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(tenantForm.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (tenantForm.password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters");
      return;
    }
    if (tenantForm.password !== confirmPassword.value) {
      Alert.alert("Alert", "Password and Confirm Password must match");
      return;
    }

    if (hasAcceptedTerms !== true) {
      return Alert.alert(
        "You must accept the Terms and Conditions to create an account!"
      );
    }

    try {
      // const res: any = await api.tenant.create(tenantForm);

      const result = await createTenant(tenantForm).unwrap();
      console.log("result", result);

      Alert.alert("You are registered!");
      setTenantForm({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        age: 0,
        guardian: "",
        address: "",
        phone_number: "",
      });
      setConfirmPassword({ value: "", isTrue: false });
      route.navigate("Login");
    } catch (error: any) {
      console.log("signup tenant error", error);
      Alert.alert("Error: ", error.message);
    }
  };

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsModal, setTermsModal] = useState(false);

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[
        GlobalStyle.GlobalsContentContainer,
        {
          justifyContent: "center",
          alignItems: "center",
          gap: Spacing.lg,
        },
      ]}
    >
      <VStack style={[s.container]}>
        <Heading
          style={{ color: Colors.TextInverse[1], fontSize: Fontsize.h2 }}
        >
          Create Account as a Tenant
        </Heading>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Username</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.username}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, username: text })
              }
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Firstname</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.firstname}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, firstname: text })
              }
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Lastname</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.lastname}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, lastname: text })
              }
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Age</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.age}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, age: text })
              }
              style={[s.FormTextInput]}
              keyboardType="numeric"
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Guardian Name</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.guardian}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, guardian: text })
              }
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Email</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.email}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, email: text })
              }
              keyboardType="email-address"
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Home Address</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.address}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, address: text })
              }
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Phone Number</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.phone_number}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, phone_number: text })
              }
              keyboardType="phone-pad"
              style={[s.FormTextInput]}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>
            <Text style={[s.FormLabel]}>Password</Text>
          </FormControl.Label>
          <Input>
            <InputField
              value={tenantForm.password}
              onChangeText={(text: string) =>
                setTenantForm({ ...tenantForm, password: text })
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
            <Button title="Create" onPressAction={handleFormSubmit} />
          </HStack>
        </VStack>
      </VStack>
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
  Text: {
    color: Colors.TextInverse[2],
  },
  TextInput: {
    color: Colors.TextInverse[3],
  },
  TextButton: {
    color: "black",
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

