import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { VerificationSubmitScreenMeta } from "../navigation/dashboard.types";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { Colors, GlobalStyle } from "@/constants";
import { useCreateVerificaitonDocumentMutation } from "@/infrastructure/valid-docs/verification-document/verification-document.redux.api";
import { Controller, useForm } from "react-hook-form";
import {
  CreateVerificationDocumentDto,
  FileFormatSchema,
  VerificationType,
} from "@/infrastructure/valid-docs/verification-document/verification-document.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateVerificationDocumentSchema,
  VerificationTypeMap,
} from "@/infrastructure/valid-docs/verification-document/verification-document.schema";
import { Button } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { AppDocumentFile } from "@/infrastructure/document/document.schema";
import PressableDocumentPicker from "@/components/ui/DocumentComponentUtilities/PressableDocumentPicker";
import { useDecisionModal } from "@/components/ui/FullScreenDecisionModal";

export default function VerificationSubmitScreen({ route }) {
  const userId: number = route.params.userId;
  const documentFormMeta: VerificationSubmitScreenMeta = route.params.meta;
  const [createVerificationDocument, { isLoading, isError, error, isSuccess }] =
    useCreateVerificaitonDocumentMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateVerificationDocumentDto>({
    resolver: zodResolver(CreateVerificationDocumentSchema),
    defaultValues: {
      userId: userId,
      type: documentFormMeta.type,
      fileFormat: "PDF",
      expiresAt: new Date().toISOString(),
    },
  });

  const [showPicker, setShowPicker] = React.useState(false);
  const [pickedDocument, setPickedDocument] = React.useState<AppDocumentFile>();
  const { showModal } = useDecisionModal();

  const onSubmit = (data: CreateVerificationDocumentDto) => {
    console.log("data send:", data, pickedDocument, "owner");

    if (!pickedDocument) {
      Alert.alert("Error", "Please pick a document before submitting.");
      return;
    }

    showModal({
      title: "Submit Verification Document",
      message: `Are you sure you want to submit your ${documentFormMeta.displayName}?`,
      cancelText: "Cancel",
      confirmText: "Submit",
      onConfirm: async () => {
        try {
          const res = await createVerificationDocument({
            data,
            file: pickedDocument,
            sourceTarget: "owners",
          }).unwrap();

          console.log("Verification submission response:", res);
          Alert.alert("Document submitted successfully!");
        } catch (e) {
          console.log("Submit error:", e);
          Alert.alert("Failed to submit document.");
        }
      },
    });
  };

  const selectedType = watch("type");
  const selectedFileFormat = watch("fileFormat");

  const verificationTypeKeys = Object.keys(
    VerificationTypeMap
  ) as VerificationType[];

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.mainConatiner]}
      contentContainerStyle={[
        GlobalStyle.GlobalsContentContainer,
        s.contianerStyle,
      ]}
    >
      <View>
        <View style={s.container}>
          <Text style={[s.label, s.textColor]}>Submit a Document</Text>
          <Text style={[{ color: "white" }]}>
            {documentFormMeta.displayName}
          </Text>
          <Text style={s.description}>
            {selectedType && selectedType in VerificationTypeMap
              ? VerificationTypeMap[selectedType as VerificationType]
                  .description
              : ""}
          </Text>

          <Text style={s.label}>Select File Format</Text>
          <Controller
            control={control}
            name="fileFormat"
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange}>
                {FileFormatSchema.options.map((format) => (
                  <Picker.Item key={format} label={format} value={format} />
                ))}
              </Picker>
            )}
          />

          <Text style={s.label}>Expiration Date</Text>
          <Controller
            control={control}
            name="expiresAt"
            render={({ field: { onChange, value } }) => (
              <>
                <Text
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderRadius: 6,
                    marginTop: 8,
                  }}
                  onPress={() => setShowPicker(true)}
                >
                  {new Date(value).toDateString()}
                </Text>

                {showPicker && (
                  <DateTimePicker
                    value={new Date(value)}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowPicker(false);

                      if (event.type === "set" && date) {
                        onChange(date.toISOString());
                      }
                    }}
                  />
                )}
              </>
            )}
          />
          <PressableDocumentPicker
            pickDocument={setPickedDocument}
            removeDocument={() => setPickedDocument(undefined)}
          />

          <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
            <Text>Submit Document</Text>
          </Button>
          {isError && (
            <Text style={s.errorText}>Failed to submit document.</Text>
          )}
          {isSuccess && (
            <Text style={s.successText}>Document submitted successfully!</Text>
          )}
        </View>
      </View>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  mainConatiner: {},
  contianerStyle: {},

  textColor: {
    color: Colors.TextInverse[2],
  },

  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  successText: {
    color: "green",
    marginTop: 8,
  },
});

//SESSIONS

//**
// currentSelectedPaybillsID = 2
//  */
