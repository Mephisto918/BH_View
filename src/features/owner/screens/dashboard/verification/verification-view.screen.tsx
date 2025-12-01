import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import React from "react";
import {
  OwnerDashboardStackParamList,
  VerificationSubmitScreenMeta,
} from "../navigation/dashboard.types";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import {
  BorderRadius,
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
} from "@/constants";
import {
  useGetByIdQuery,
  usePatchVerificaitonDocumentMutation,
} from "@/infrastructure/valid-docs/verification-document/verification-document.redux.api";
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
import PressableDocumentFullscreen from "@/components/ui/DocumentComponentUtilities/PressableDocumentFullscreen";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function VerificationViewScreen({ route }) {
  const userId: number = route.params.userId;
  const docId: number = route.params.docId;
  const documentFormMeta: VerificationSubmitScreenMeta = route.params.meta;

  const navigate =
    useNavigation<NativeStackNavigationProp<OwnerDashboardStackParamList>>();

  if (!userId) {
    navigate.goBack();
    return (
      <FullScreenErrorModal message="User Not Found!"></FullScreenErrorModal>
    );
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data: documentData,
    isLoading: isDocumentLoading,
    isError: isDocumentError,
    error: documentErrorObject,
    refetch: documentRefetch,
  } = useGetByIdQuery({
    id: docId,
    sourceTarget: "owners",
  });

  const [pickDate, setPickDate] = React.useState<string>("");
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [pickedDocument, setPickedDocument] = React.useState<AppDocumentFile>();
  const [patchDocument, { isLoading: isPatching }] =
    usePatchVerificaitonDocumentMutation();
  const { showModal } = useDecisionModal();

  console.log("documentData on Viewing", documentData);
  console.log("error Object:", documentErrorObject);

  const verificationTypeKeys = Object.keys(
    VerificationTypeMap
  ) as VerificationType[];

  function getFileName(url: string | undefined): string {
    const urlParts = url?.split("/"); // split by slash
    const fullFileName = urlParts?.pop() || ""; // get last segment
    return decodeURIComponent(fullFileName); // decode URL encoding
  }

  const hanldeOnRefreshPage = async () => {
    setRefreshing(true);
    await documentRefetch();
    setRefreshing(false);
  };

  const handleSubmitPatchedDocument = async () => {
    if (!pickedDocument) {
      return Alert.alert("Missing File", "Please pick a new document.");
    }

    if (!pickDate) {
      return Alert.alert(
        "Missing Expiration Date",
        "Please select an expiration date."
      );
    }

    showModal({
      title: "Resubmit Document",
      message:
        "Are you sure you want to resubmit this document for verification?",
      cancelText: "Cancel",
      confirmText: "Submit",
      onConfirm: async () => {
        try {
          await patchDocument({
            id: docId,
            data: {
              expiresAt: pickDate,
            },
            file: pickedDocument,
            sourceTarget: "owners",
          }).unwrap();

          Alert.alert("Success", "Document resubmitted successfully!");
          documentRefetch();
        } catch (e) {
          console.log("patch error:", e);
          Alert.alert("Error", "Failed to resubmit document.");
        }
      },
    });
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.mainConatiner]}
      contentContainerStyle={[
        GlobalStyle.GlobalsContentContainer,
        s.contianerStyle,
      ]}
      refreshing={refreshing}
      onRefresh={hanldeOnRefreshPage}
    >
      {isDocumentError && (
        <FullScreenErrorModal message="Error Loading the information" />
      )}
      {isDocumentLoading && <FullScreenLoaderAnimated />}
      <View style={{ gap: 10 }}>
        <View style={s.container}>
          <View style={[s.debugg]}>
            <Text style={[{ color: "white", fontSize: Fontsize.h3 }]}>
              Document Name:
            </Text>
            <Text style={[{ color: "white", fontSize: Fontsize.xl }]}>
              {getFileName(documentData?.url)}
            </Text>
            <View style={[s.borderLine]}></View>
          </View>
          <View style={[s.debugg]}>
            <Text style={[s.label, s.textColor]}>
              Type: {documentData?.verificationType}
            </Text>
            <Text style={[s.textColor]}>
              File Format: {documentData?.fileFormat}
            </Text>
            <View style={[s.borderLine]}></View>
          </View>

          <View style={[s.debugg]}>
            <Text style={[s.label, s.textColor]}>Expiration Date</Text>
            <Text style={[s.textColor]}>{documentData?.expiresAt}</Text>
            <View style={[s.borderLine]}></View>
          </View>
          <PressableDocumentFullscreen document={documentData?.url} />

          <View style={[s.debugg]}>
            <Text style={[s.label, s.textColor]}>Status:</Text>
            <Text style={[s.textColor]}>
              {" "}
              {documentData?.verificationStatus}
            </Text>
            <View style={[s.borderLine]}></View>
          </View>
          {documentData?.verificationStatus === "REJECTED" ? (
            <View>
              <Text style={[s.label, { color: "red", fontSize: 18 }]}>
                This document was rejected.
              </Text>
              <Text style={[s.rejectionReason, s.textColor]}>
                Reject Reason: {documentData?.rejectionReason ?? "No Reason"}
              </Text>

              <Text style={{ marginTop: 6, marginBottom: 12, color: "white" }}>
                Please upload a new document and provide a new expiration date.
              </Text>

              {/* PICK NEW FILE */}
              <Text style={[s.label]}>Upload New Document</Text>

              <PressableDocumentPicker
                pickDocument={setPickedDocument}
                removeDocument={() => setPickedDocument(undefined)}
              />

              {pickedDocument && (
                <Text style={{ marginTop: 5, color: "white" }}>
                  Selected: {pickedDocument.name}
                </Text>
              )}

              <Pressable
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderRadius: 6,
                  marginTop: 8,
                }}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>
                  {pickDate
                    ? new Date(pickDate).toDateString()
                    : "Tap to choose date"}
                </Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={pickDate ? new Date(pickDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);

                    if (event.type === "set" && date) {
                      setPickDate(date.toISOString());
                    }
                  }}
                />
              )}

              <Button
                style={{ marginTop: 20 }}
                onPress={handleSubmitPatchedDocument}
              >
                <Text style={[s.textColor]}>Submit New Document</Text>
              </Button>
            </View>
          ) : null}
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

  borderLine: {
    borderWidth: 2,
    borderColor: Colors.PrimaryLight[9],
    marginTop: 12,
  },

  rejectionReason: {},

  debugg: {
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: Colors.PrimaryLight[3],
    // borderColor: Colors.PrimaryLight[10],
    // padding: Spacing.sm,
    // gap: 10,
  },

  // borderLine: {
  //   borderWidth: 2,
  //   borderColor: Colors.PrimaryLight[4],
  //   marginTop: 12,
  // },

  // debugg: {
  //   borderRadius: BorderRadius.md,
  //   overflow: "hidden",
  //   borderWidth: 1,
  //   borderColor: Colors.PrimaryLight[3],
  //   // borderColor: Colors.PrimaryLight[10],
  //   // padding: Spacing.sm,
  //   // gap: 10,
  // },

  container: {
    padding: 16,
    gap: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    fontSize: Fontsize.xl,
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
