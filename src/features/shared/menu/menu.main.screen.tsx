import { Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { logout } from "@/infrastructure/auth/auth.redux.slice";

//
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Heading,
  View,
} from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { GlobalStyle, Colors, Spacing } from "@/constants";

// routing
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/features/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuStackParamList } from "./navigation/menu.stack.types";
import { CommonActions } from "@react-navigation/native";

import { useIsFocused } from "@react-navigation/native";

// redux
import { useDispatch } from "react-redux";
import { useDynamicUserApi } from "@/infrastructure/user/user.hooks";
import ScreenHeaderComponent from "@/components/layout/ScreenHeaderComponent";

type ToLoginScreen = NativeStackNavigationProp<RootStackParamList>;

export default function MenuMainScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // TODO: put a wrapper function or do an abstraction on this operation
  // const userRole = useSelector((state: RootState) => state.auth.userData?.role);
  const { selectedUser: userData } = useDynamicUserApi();

  //* data is userData
  // TODO: put a wrapper function or do an abstraction on this operation

  const navigateToLogin = useNavigation<ToLoginScreen>();
  const navigateRoot = useNavigation<ToLoginScreen>();
  const navigationMenu =
    useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  useEffect(() => {
    console.log("userDATA: ", userData);
  }, [isFocused]);

  const logOutOnPress = () => {
    dispatch(logout());

    navigateToLogin.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <ScreenHeaderComponent text={{ textValue: "Settings" }} />
      <View style={[s.container]}>
        <VStack
          style={{
            // borderColor: 'green',
            // borderWidth: 2,
            width: "100%",
          }}
        >
          <VStack
            style={{
              // borderColor: 'orange',
              // borderWidth: 2,
              marginBottom: 50,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <HStack
              gap={20}
              style={{
                justifyContent: "center",
                alignItems: "center",

                marginBottom: 25,
              }}
            >
              <Avatar></Avatar>
              <VStack gap={0}>
                <HStack gap={10}>
                  <Heading size="xl" color={Colors.TextInverse[2]}>
                    {userData?.firstname}
                  </Heading>
                  <Heading size="xl" color={Colors.TextInverse[2]}>
                    {userData?.lastname}
                  </Heading>
                </HStack>
                <Box>
                  <Heading
                    size="lg"
                    color={Colors.TextInverse[2]}
                    fontWeight="$light"
                  >
                    @{userData?.username}
                  </Heading>
                </Box>
              </VStack>
            </HStack>
            <Button
              style={{ alignSelf: "center", gap: 10 }}
              onPress={() => navigationMenu.navigate("UserEdit")}
            >
              <Ionicons name="pencil-outline" size={24} color="black" />
              <Text>Edit Profile</Text>
            </Button>
          </VStack>

          <VStack style={[s.buttons_Array]}>
            <Button
              // onPress={()=>navigationMenu.navigate('Settings')}
              style={[s.buttons_Array_button]}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text>Settings</Text>
            </Button>
            <Button
              style={[s.buttons_Array_button]}
              onPress={() => navigationMenu.navigate("CustomerHelp")}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
              <Text>Help</Text>
            </Button>
            <Button
              style={[s.buttons_Array_button]}
              onPress={() => navigationMenu.navigate("Accessibility")}
            >
              <Ionicons name="accessibility-outline" size={24} color="black" />
              <Text>Accessibility</Text>
            </Button>
            {userData?.role == "ADMIN" && (
              <Button
                style={[s.buttons_Array_button]}
                onPress={() => {
                  navigateRoot.navigate("Auth");
                }}
              >
                <Ionicons name="receipt-outline" size={24} color="black" />
                <Text>Logs</Text>
              </Button>
            )}
            <Button style={[s.buttons_Array_button]} onPress={logOutOnPress}>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text>Logout</Text>
            </Button>
          </VStack>
        </VStack>
      </View>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  GlobalsContainer: {
    padding: Spacing.md,
  },

  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },
  buttons_Array: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 10,
    width: "100%",
    padding: 10,
  },
  buttons_Array_button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});
