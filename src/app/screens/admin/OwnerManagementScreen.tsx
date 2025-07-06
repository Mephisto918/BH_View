import {
  View,
  Text,
  StyleSheet,
  Alert as AlertRN,
  Pressable,
} from "react-native";
import {
  Button as ButtonGL,
  Alert,
  Box,
  HStack,
  VStack,
  Heading,
  Button as ButtonRN,
  FormControl,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  BorderRadius,
  Colors,
  GlobalStyle,
  Spacing,
  Fontsize,
} from "../../../constants/index";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

import { ScrollView } from "react-native-gesture-handler";

import Button from "@/components/ui/Button";

// redux
import { RootState } from "@/stores";
import { useGetAllQuery } from "@/stores/tenants/tenants";

const OwnerManagement = () => {
  const handleDeleteApplication = async (userId: string | number) => {
    try {
      const result = await api.owner_applicants.delete(selectedUser.id);
      fetchUsers();
      console.log("Delete user:", userId);
      AlertRN.alert("Accound Deleted!");
    } catch (error) {
      console.log(error);
      AlertRN.alert("Error in saving changes!");
    }
  };

  const [addOwnerModal, setAddOwnerModal] = useState(false);
  const [addOwnerForm, setAddOwnerForm] = useState<AddOwnerProps>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    phone_number: "",
    address: "",
  });

  const handleAddOwner = async () => {
    for (const [key, value] of Object.entries(addOwnerForm)) {
      if (!value.trim()) {
        AlertRN.alert("Missing Field", `Please fill in the ${key}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(addOwnerForm.email)) {
      AlertRN.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (addOwnerForm.password.length < 6) {
      AlertRN.alert(
        "Invalid Password",
        "Password must be at least 6 characters"
      );
      return;
    }
    // if(addOwnerForm.password !== addOwnerForm.confirmPassword){
    //   AlertRN.alert('Alert', 'Password and Confirm Password must match');
    //   return
    // }
    try {
      // const {confirmPassword: _, ...filtered} = addOwnerForm
      const result = await api.owner.create(addOwnerForm);
      fetchUsers();
      console.log("Owner Sucessfull Added");
      AlertRN.alert("Owner Sucessfull Added");
      setAddOwnerForm({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        phone_number: "",
        address: "",
      });
      setAddOwnerModal(false);
    } catch (error) {
      console.log(error);
      AlertRN.alert("Error in adding owner!");
    }
  };

  const handleUpdateUser = async (userId: string | number) => {
    try {
      const result = await api.owner.update(selectedUser, selectedUser.id);
      fetchUsers();
      console.log("Owner Sucessfull Added");
      AlertRN.alert("Owner Sucessfull Added");
      setSelectedUser({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        phone_number: "",
        address: "",
      });
      setAddOwnerModal(false);
    } catch (error) {
      console.log(error);
      AlertRN.alert("Error in adding owner!");
    }
  };
  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <ScrollView>
        <Box
          style={{
            gap: Spacing.md,
            padding: Spacing.md,
          }}
        >
          {users.map((user) => (
            <HStack
              key={user.id}
              style={{
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
                backgroundColor: Colors.PrimaryLight[6],
              }}
            >
              <VStack>
                <Heading>
                  <Text style={[s.Text]}>{user.username}</Text>
                </Heading>
                <HStack>
                  <Text style={[s.Text]}>{user.firstname} </Text>
                  <Text style={[s.Text]}>{user.lastname}</Text>
                </HStack>
              </VStack>
              <HStack
                style={{
                  marginLeft: "auto",
                  alignItems: "center",
                  gap: Spacing.md,
                }}
              >
                {String(user.is_approved) === "false" ? (
                  <ButtonRN style={{ backgroundColor: Colors.Alert }}>
                    <Text style={[s.Text, { color: "black" }]}>Pending</Text>
                  </ButtonRN>
                ) : (
                  <ButtonRN style={{ backgroundColor: Colors.Success }}>
                    <Text style={[s.Text, { color: "white" }]}>Approved</Text>
                  </ButtonRN>
                )}
                <ButtonRN
                  style={{ backgroundColor: Colors.PrimaryLight[2] }}
                  onPress={() => {
                    setReviewModal(true);
                    setSelectedUser(user);
                  }}
                ></ButtonRN>
              </HStack>
            </HStack>
          ))}
        </Box>
      </ScrollView>
      {reviewModal && (
        <Alert
          style={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <VStack
            style={{
              gap: Spacing.lg,
              // alignItems: 'stretch',
              height: 500,
              width: "90%",
              padding: Spacing.lg,
              borderRadius: BorderRadius.md,
              backgroundColor: Colors.PrimaryLight[7],
            }}
          >
            <Pressable
              style={{
                backgroundColor: Colors.PrimaryLight[3],
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: "10%",
                aspectRatio: 1 / 1,
                height: 30,
                padding: 0,

                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setReviewModal(false)}
            >
              <Ionicons name="close" size={30} />
            </Pressable>
            <Heading>
              <Text style={[s.Text, { fontSize: Fontsize.h1 }]}>
                Review Application
              </Text>
            </Heading>
            <ScrollView>
              <FormControl>
                <FormControl.Label>
                  <Text style={[s.FormLabel]}>Username</Text>
                </FormControl.Label>
                <Input>
                  <InputField
                    value={selectedUser?.username}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, username: text })
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
                    value={selectedUser?.firstname}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, firstname: text })
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
                    value={selectedUser?.lastname}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, lastname: text })
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
                    value={selectedUser?.email}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, email: text })
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
                    value={String(selectedUser?.age)}
                    keyboardType="numeric"
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, age: text })
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
                    value={selectedUser?.phone_number}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, phone_number: text })
                    }
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
                    value={selectedUser?.address}
                    onChangeText={(text: string) =>
                      setSelectedUser({ ...selectedUser, address: text })
                    }
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>
              {/* <View style={{paddingTop: 20, paddingBottom: 4}}>
                <Text style={{color: 'white'}}>Certificates</Text>
              </View>
              <ScrollView 
                contentContainerStyle={{ 
                  gap: 10,
                }} // optional, if using RN version that supports it
              >
                {selectedUser?.certificates_json.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Colors.PrimaryLight[5],
                      borderRadius: BorderRadius.md,
                      padding: Spacing.sm,

                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      numberOfLines={1}ellipsizeMode="tail" style={[s.Text,{fontSize: Fontsize.base,}]}
                    >
                      {item.filename}
                    </Text>
                    <Text
                      numberOfLines={1}ellipsizeMode="tail" style={[s.Text,{fontSize: Fontsize.base, marginLeft: 'auto'}]} 
                    >
                      {item.size}
                    </Text>
                  </View>

                ))}
              </ScrollView> */}
            </ScrollView>
            <VStack>
              <Button
                variant="primary"
                onPressAction={() => {
                  setReviewModal(false);
                  handleUpdateUser(selectedUser?.id);
                }}
                containerStyle={{ backgroundColor: Colors.Alert }}
              >
                <Text style={[s.TextButton]}>Edit</Text>
              </Button>
              {/* <Button 
                  variant='primary'
                  onPressAction={()=>{setReviewModal(false); handleDeleteApplication(selectedUser?.id)}} 
                  containerStyle={{backgroundColor: Colors.Alert}}
                  >
                  <Text style={[s.TextButton]}>Delete</Text>
                </Button> */}
              {/* {String(selectedUser?.is_approved) === 'false' && (
                  <Button 
                    variant='primary'
                    containerStyle={{backgroundColor: Colors.Success}}
                    onPressAction={()=>{setReviewModal(false); handleApproveApplication(selectedUser?.id)}} 
                  >
                    <Text style={[s.TextButton]}>Approved</Text>
                  </Button>
                )} */}
            </VStack>
          </VStack>
        </Alert>
      )}
      {/* -----------------Add Owner ------------------------------------------------------------------------------------------------------------ */}
      <Button
        variant="primary"
        onPressAction={() => {
          setAddOwnerModal(true);
        }}
        containerStyle={{
          position: "absolute",
          bottom: 25,
          right: 25,
          width: 50,

          backgroundColor: Colors.PrimaryLight[1],
        }}
      >
        <Ionicons name="add-outline" size={20} color={Colors.PrimaryLight[7]} />
      </Button>
      {addOwnerModal && (
        <Alert
          style={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <VStack
            style={{
              gap: Spacing.lg,
              height: 500,
              width: "90%",
              padding: Spacing.lg,
              borderRadius: BorderRadius.md,
              backgroundColor: Colors.PrimaryLight[7],
            }}
          >
            <Pressable
              style={{
                backgroundColor: Colors.PrimaryLight[3],
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: "10%",
                aspectRatio: 1 / 1,
                height: 30,
                padding: 0,

                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setAddOwnerModal(false)}
            >
              <Ionicons name="close" size={30} />
            </Pressable>
            <Heading>
              <Text style={[s.Text, { fontSize: Fontsize.h1 }]}>Add Owner</Text>
            </Heading>
            <ScrollView>
              <FormControl>
                <FormControl.Label>
                  <Text style={[s.FormLabel]}>Username</Text>
                </FormControl.Label>
                <Input>
                  <InputField
                    value={addOwnerForm.username}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, username: text })
                    }
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
                    value={addOwnerForm.password}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, password: text })
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
                    value={addOwnerForm.firstname}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, firstname: text })
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
                    value={addOwnerForm.lastname}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, lastname: text })
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
                    value={addOwnerForm.email}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, email: text })
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
                    value={addOwnerForm.age}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, age: text })
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
                    value={addOwnerForm.phone_number}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, phone_number: text })
                    }
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
                    value={addOwnerForm.address}
                    onChangeText={(text: string) =>
                      setAddOwnerForm({ ...addOwnerForm, address: text })
                    }
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>
            </ScrollView>
            <VStack>
              <Button
                variant="primary"
                onPressAction={() => {
                  handleAddOwner();
                }}
                containerStyle={{ backgroundColor: Colors.PrimaryLight[3] }}
              >
                <Text style={[s.TextButton]}>Add Owner</Text>
              </Button>
            </VStack>
          </VStack>
        </Alert>
      )}
      {/* -----------------Add Owner ------------------------------------------------------------------------------------------------------------ */}
    </StaticScreenWrapper>
  );
};

const s = StyleSheet.create({
  FormLabel: {
    fontSize: Fontsize.base,
    color: Colors.TextInverse[1],
    paddingTop: Spacing.sm,
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

export default OwnerManagement;
