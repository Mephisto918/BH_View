import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderSearchProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function HeaderSearch({
  containerStyle,
  placeholder = "Search...",
  value,
  setValue,
  ...props
}: HeaderSearchProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="search" size={24} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        {...props}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => setValue("")}>
          <Ionicons
            name="close-circle"
            size={20}
            color="#666"
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 8,
  },
});

/* Usage
<SearchBar
  placeholder="Search boarding houses"
  value={search}
  setValue={setSearch}
  onSearch={(query: string) => {
    const filtered = data.filter(item => item.name.includes(query))
    setFilteredResults(filtered)
  }}
/>
 */
