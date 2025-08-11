import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PropertiesStackParamList } from "./properties.stack.types";

export function usePropertyNavigation() {
  return useNavigation<NativeStackNavigationProp<PropertiesStackParamList>>();
}