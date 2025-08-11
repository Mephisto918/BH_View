import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Colors } from "../index"; // or adjust the path based on your structure

export const backButtonConfig: NativeStackNavigationOptions = {
  headerShown: true,
  title: "",
  headerStyle: {
    backgroundColor: Colors.PrimaryLight[8],
  },
  headerTintColor: Colors.PrimaryLight[1],
};
