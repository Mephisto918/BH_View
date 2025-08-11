import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Box, VStack } from "@gluestack-ui/themed";
import { ScrollView } from "react-native-gesture-handler";

// form hook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertiesRoomCreateProps } from "../types/property.types";
import { Colors, Fontsize, Spacing } from "@/constants";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import {
  CreateRoomInput,
  CreateRoomInputSchema,
} from "../../../../../infrastructure/room/room.schema";
import PropertiesRoomCreateModal from "./properties.room.create.modal";
import { Ionicons } from "@expo/vector-icons";

export default function PropertiesRoomCreate({
  rooms,
  setRooms,
}: PropertiesRoomCreateProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRoomIndex, setEditingRoomIndex] = useState<number | null>(null);
  // const [editingRoomData, setEditingRoomData] =
  //   useState<CreateRoomInput | null>(null);

  const initialDefaultValues: CreateRoomInput = {
    roomNumber: "",
    maxCapacity: "",
    price: "",
    tags: [],
    roomType: "SOLO",
    gallery: [],
  };

  const {
    formState: { errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(CreateRoomInputSchema),
    defaultValues: initialDefaultValues,
  });

  return (
    <StaticScreenWrapper>
      <VStack>
        <View
          style={{
            borderBottomColor: "#bbb", // line color
            borderBottomWidth: 1, // line thickness
            marginVertical: 10, // spacing around the line
          }}
        />
        {/* Modal */}
        <PropertiesRoomCreateModal
          visible={modalVisible}
          initialData={
            editingRoomIndex !== null
              ? { ...rooms[editingRoomIndex], index: editingRoomIndex }
              : undefined
          }
          onClose={() => {
            setModalVisible(false);
            setEditingRoomIndex(null);
          }}
          onSubmit={(roomData, index) => {
            if (index !== undefined) {
              const updatedRooms = [...rooms];
              updatedRooms[index] = roomData;
              setRooms(updatedRooms);
            } else {
              setRooms([...rooms, roomData]);
            }
            setModalVisible(false);
            setEditingRoomIndex(null);
          }}
        />

        <Text style={[s.Form_Label]}>Add Rooms</Text>
        <View style={{ alignItems: "flex-start", marginBottom: Spacing.lg }}>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: Colors.PrimaryLight[6],
              padding: 10,
              borderRadius: 10,
              opacity: pressed ? 0.8 : 1,
              flexDirection: "row",
              gap: 10,
            })}
            onPress={() => {
              setEditingRoomIndex(null); // this means ADD
              // setEditingRoomData(null); // start fresh
              setModalVisible(true);
            }}
          >
            <Text style={[s.generic_text, { fontSize: Fontsize.md }]}>
              Add Room
            </Text>
            <Ionicons name="add" size={20} color="white" />
          </Pressable>
        </View>
        <ScrollView
          style={{ height: 175 }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "flex-start",
            alignContent: "flex-start",
          }}
        >
          {rooms &&
            rooms.map((room, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setEditingRoomIndex(index); // mark which room
                  // setEditingRoomData(room); // pass in initial values
                  setModalVisible(true);
                }}
              >
                <RoomItem roomItem={room} />
              </Pressable>
            ))}
        </ScrollView>
      </VStack>
    </StaticScreenWrapper>
  );
}

function RoomItem({ roomItem }: { roomItem: CreateRoomInput }) {
  return (
    <Box
      style={{
        borderColor: "red",
        borderWidth: 3,
        borderRadius: 8,
        padding: 10,
        aspectRatio: 3 / 4,
        height: 175,
      }}
    >
      <Text style={[s.generic_text]}>{roomItem.roomNumber}</Text>
      <Text style={[s.generic_text]}>{roomItem.price}</Text>
      <Text style={[s.generic_text]}>{roomItem.roomType}</Text>
      <Text style={[s.generic_text]}>{roomItem.maxCapacity}</Text>
    </Box>
  );
}

const s = StyleSheet.create({
  generic_text: {
    color: Colors.TextInverse[2],
  },
  Form_Label: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.xxl,
    marginBottom: 6,
  },
  Form_SubLabel: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.xl,
    marginBottom: 6,
  },
  Form_Input_Placeholder: {
    color: Colors.TextInverse[2],
    fontSize: Fontsize.md,
  },
});
