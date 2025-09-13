import { Button } from "@gluestack-ui/themed";
import { Overlay } from "@gluestack-ui/overlay";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/actionsheet";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Input,
  InputField,
  VStack,
  FormControl,
  Box,
  Image,
} from "@gluestack-ui/themed";
import {
  CreateRoomInput,
  CreateRoomInputSchema,
} from "@/infrastructure/room/room.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Pressable, ScrollView } from "react-native-gesture-handler";
import { ScrollView, Pressable } from "react-native";
import { BorderRadius, Colors, Fontsize, Spacing } from "@/constants";
import {
  ROOM_FEATURE_TAGS,
  RoomFeatureTag,
} from "@/infrastructure/room/room.constants";
import { Ionicons } from "@expo/vector-icons";
import { pickImageExpo } from "@/infrastructure/image/image.service";

type RoomWithIndex = CreateRoomInput & { index?: number };
interface PropertiesRoomCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRoomInput, indexToReplace?: number) => void;
  initialData?: RoomWithIndex;
  isEditing?: boolean;
}

export default function PropertiesRoomCreateModal({
  visible,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: PropertiesRoomCreateModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues: CreateRoomInput = {
    roomNumber: "",
    maxCapacity: "",
    price: "",
    tags: [],
    roomType: "SOLO",
    gallery: [],
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(CreateRoomInputSchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData); // for edit mode
    } else {
      reset(defaultValues); // for add mode
    }
  }, [initialData, visible]);

  const [availableFeatureTage, setAvailableFeatureTage] = useState<
    Array<string>
  >(
    ROOM_FEATURE_TAGS.filter(
      (feature) => !defaultValues.tags?.includes(feature)
    )
  );
  const selectedFeatureTags = watch("tags") ?? [];
  useEffect(() => {
    setAvailableFeatureTage(
      ROOM_FEATURE_TAGS.filter(
        (feature) => !selectedFeatureTags.includes(feature)
      )
    );
  }, [selectedFeatureTags]);
  const handleSelectFeatureTag = (item: string) => {
    const update = [...(selectedFeatureTags || []), item] as RoomFeatureTag[];
    setValue("tags", update);
    setAvailableFeatureTage((prev) => prev.filter((a) => a !== item));
  };
  const handleRemoveFeatureTag = (item: string) => {
    const update = (selectedFeatureTags || []).filter((a) => a !== item);
    setValue("tags", update as RoomFeatureTag[]);
    setAvailableFeatureTage((prev) => [...prev, item]);
  };

  const handlePickGalleryImages = async () => {
    try {
      const pick = await pickImageExpo(10);
      if (pick && pick.length > 0) {
        setValue("gallery", pick);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to pick thumbnail");
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    const newGallery = [...(getValues("gallery") ?? [])]; // get current value
    newGallery.splice(indexToRemove, 1); // remove item by index
    setValue("gallery", newGallery); // update the form
  };

  const handleFinalSubmit = (data: CreateRoomInput) => {
    const index = isEditing ? initialData?.index : undefined;
    onSubmit(data, index);
    onClose();
  };

  return (
    <Overlay>
      <Modal
        visible={visible}
        onRequestClose={onClose}
        transparent
        animationType="fade"
      >
        <View style={[modalStyles.overlay]}>
          <View style={[modalStyles.container]}>
            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              style={[modalStyles.closeButton]}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Modal Form Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: Spacing.sm }}>
              {/* Room Number */}
              <FormControl isInvalid={!!errors.roomNumber}>
                <FormControl.Label>
                  <Text style={[s.Form_SubLabel]}>Room Number</Text>
                </FormControl.Label>
                <Controller
                  control={control}
                  name="roomNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input borderColor="$coolGray400">
                      <InputField
                        placeholder="Room code"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        style={[s.Form_Input_Placeholder]}
                      />
                    </Input>
                  )}
                />
                {errors.roomNumber && (
                  <Text style={{ color: "red" }}>
                    {errors.roomNumber.message}
                  </Text>
                )}
              </FormControl>

              {/* Max Capacity */}
              <FormControl isInvalid={!!errors.maxCapacity}>
                <FormControl.Label>
                  <Text style={[s.Form_SubLabel]}>Max Capacity</Text>
                </FormControl.Label>
                <Controller
                  control={control}
                  name="maxCapacity"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input borderColor="$coolGray400">
                      <InputField
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType="numeric"
                        style={[s.Form_Input_Placeholder]}
                      />
                    </Input>
                  )}
                />
                {errors.maxCapacity && (
                  <Text style={{ color: "red" }}>
                    {errors.maxCapacity.message}
                  </Text>
                )}
              </FormControl>

              {/* Price */}
              <FormControl isInvalid={!!errors.price}>
                <FormControl.Label>
                  <Text style={[s.Form_SubLabel]}>Price</Text>
                </FormControl.Label>
                <Controller
                  control={control}
                  name="price"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input borderColor="$coolGray400">
                      <InputField
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType="numeric"
                        style={[s.Form_Input_Placeholder]}
                      />
                    </Input>
                  )}
                />
                {errors.price && (
                  <Text style={{ color: "red" }}>{errors.price.message}</Text>
                )}
              </FormControl>

              {/* Room type */}
              <FormControl isInvalid={!!errors.roomType}>
                <FormControl.Label>
                  <Text style={[s.Form_SubLabel]}>Room Type</Text>
                </FormControl.Label>

                <Controller
                  control={control}
                  name="roomType"
                  rules={{ required: "Room Type is required" }}
                  render={({ field: { onChange, value } }) => (
                    <View style={{ marginBottom: 10 }}>
                      <Button onPress={() => setIsOpen(true)}>
                        {value || "Select Room Type"}
                      </Button>

                      <Actionsheet
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                      >
                        <ActionsheetBackdrop />
                        <ActionsheetContent>
                          {["SOLO", "DUO", "TRIO", "SQUAD", "FAMILY"].map(
                            (option) => (
                              <ActionsheetItem
                                key={option}
                                onPress={() => {
                                  onChange(option);
                                  setIsOpen(false);
                                }}
                              >
                                <ActionsheetItemText>
                                  {option}
                                </ActionsheetItemText>
                              </ActionsheetItem>
                            )
                          )}
                        </ActionsheetContent>
                      </Actionsheet>

                      {errors?.roomType && (
                        <Text style={{ color: "red", marginTop: 4 }}>
                          {errors.roomType.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                {errors.roomType && (
                  <Text style={{ color: "red", marginTop: 4 }}>
                    {errors.roomType.message}
                  </Text>
                )}
              </FormControl>

              {/* Tags */}
              <VStack
                style={{
                  gap: Spacing.md,
                  borderColor: Colors.PrimaryLight[4],
                  borderWidth: 1,
                  padding: Spacing.sm,
                  borderRadius: BorderRadius.md,
                  // marginBottom: Spacing.md,
                }}
              >
                <Text style={[s.Form_SubLabel]}>Select Room Amenities:</Text>
                <ScrollView
                  style={{ height: 150 }}
                  contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "flex-start",
                    alignContent: "flex-start",
                  }}
                  nestedScrollEnabled={true} // important when inside another scrollable parent
                  keyboardShouldPersistTaps="handled" // helps with form fields
                >
                  {availableFeatureTage.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleSelectFeatureTag(item)}
                    >
                      <Box
                        style={{
                          borderRadius: BorderRadius.md,
                          padding: 5,
                          backgroundColor: Colors.PrimaryLight[6],
                        }}
                      >
                        <Text style={[s.generic_text]}>{item}</Text>
                      </Box>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={[s.Form_SubLabel, { marginTop: Spacing.md }]}>
                  Selected Amenities:
                </Text>
                <ScrollView
                  style={{ height: 150 }}
                  contentContainerStyle={{
                    gap: 10,
                    padding: Spacing.sm,
                    backgroundColor: Colors.PrimaryLight[7],
                  }}
                  nestedScrollEnabled={true} // important when inside another scrollable parent
                  keyboardShouldPersistTaps="handled" // helps with form fields
                >
                  {selectedFeatureTags.length ? (
                    selectedFeatureTags.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleRemoveFeatureTag(item)}
                      >
                        <Box
                          style={{
                            borderRadius: BorderRadius.md,
                            padding: 5,
                            backgroundColor: Colors.PrimaryLight[6],
                          }}
                        >
                          <Text style={[s.generic_text]}>{item}</Text>
                        </Box>
                      </Pressable>
                    ))
                  ) : (
                    <Text style={[s.generic_text]}>No amenities selected</Text>
                  )}
                </ScrollView>
                {/* image selection */}
                <VStack>
                  <VStack>
                    <Pressable
                      onPress={handlePickGalleryImages}
                      style={{
                        padding: Spacing.sm,
                        alignSelf: "flex-start",
                        backgroundColor: Colors.PrimaryLight[6],
                        borderRadius: BorderRadius.md,
                      }}
                    >
                      <Text style={[s.generic_text, { fontSize: Fontsize.md }]}>
                        Select Images
                      </Text>
                    </Pressable>
                    <Controller
                      control={control}
                      name="gallery"
                      render={({ field: { value } }) => {
                        const galleryImage = value || [];

                        return (
                          <>
                            <ScrollView
                              horizontal
                              style={{
                                width: "100%",
                                height: 100,
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                              contentContainerStyle={{
                                marginTop: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 8,
                              }}
                            >
                              {galleryImage.length > 0 ? (
                                galleryImage.map((image, index) => (
                                  <View key={index}>
                                    <Image
                                      source={{ uri: image.uri }}
                                      style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 8,
                                        marginRight: 8,
                                        backgroundColor: "#ccc",
                                      }}
                                      alt={`Gallery image ${index + 1}`}
                                    />
                                    <Pressable
                                      onPress={() =>
                                        handleRemoveGalleryImage(index)
                                      }
                                      style={{
                                        position: "absolute",
                                        top: "0%",
                                        right: "9%",
                                      }}
                                    >
                                      <Ionicons
                                        name="close-circle"
                                        size={20}
                                        color="white"
                                      />
                                    </Pressable>
                                  </View>
                                ))
                              ) : (
                                <Text style={{ color: "white" }}>
                                  No Images Selected
                                </Text>
                              )}
                            </ScrollView>
                          </>
                        );
                      }}
                    />
                  </VStack>
                </VStack>

                {/* Submit */}
                <VStack
                  style={{
                    alignItems: "center",
                    borderRadius: BorderRadius.md,
                    backgroundColor: Colors.PrimaryLight[4],
                    padding: 10,
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={handleSubmit(handleFinalSubmit)}>
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      Add Room
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </VStack>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Overlay>
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

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // zIndex: 1,
  },
  container: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: Colors.PrimaryLight[8],
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  closeButton: {
    backgroundColor: Colors.PrimaryLight[3],
    borderRadius: BorderRadius.circle,
    position: "absolute",
    right: 10,
    top: 10,
    // zIndex: 1,
  },
});
