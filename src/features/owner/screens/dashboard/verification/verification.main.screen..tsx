import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { VStack, Button } from "@gluestack-ui/themed";
import { Colors, BorderRadius, GlobalStyle, Spacing } from "@/constants";
import LegitmacyContsentComponent from "../../../../../components/ui/TermsAndConditionsModals/LegitmacyContsentComponent";
import { useGetVerificationStatusQuery } from "@/infrastructure/valid-docs/verification-document/verification-document.redux.api";
import {
  useGetOneQuery,
  usePatchMutation,
} from "@/infrastructure/owner/owner.redux.api";
import { useSelector } from "react-redux";
import { RootState } from "@/application/store/stores";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  VerificationStatus,
  VerificationType,
  VerificationTypeMap,
} from "@/infrastructure/valid-docs/verification-document/verification-document.schema";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OwnerDashboardStackParamList } from "../navigation/dashboard.types";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";

export default function VerificationMainScreen() {
  const navigate =
    useNavigation<NativeStackNavigationProp<OwnerDashboardStackParamList>>();

  const ownerData = useSelector(
    (state: RootState) => state.owners.selectedUser
  );
  const ownerId = ownerData?.id;

  if (!ownerId) {
    Alert.alert("Error", "Owner not found");
    return null;
  }

  // OWNER PROFILE QUERY WITH FULL DEBUG LOGS
  const {
    data: ownerProfileData,
    isLoading: isOwnerLoading,
    isError: isOwnerError,
    isFetching,
    refetch: ownerRefetch,
  } = useGetOneQuery(ownerId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // VERIFICATION STATUS QUERY
  const {
    data: verificationStatusData,
    isLoading: verificationStatusLoading,
    isError: verificationStatusError,
    refetch: verificationStatusRefetch,
  } = useGetVerificationStatusQuery(
    { id: ownerId, sourceTarget: "owners" },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  const [patch] = usePatchMutation();

  // THIS IS THE VALUE YOU CARE ABOUT
  const hasAcceptedLegitimacyConsent =
    ownerProfileData?.hasAcceptedLegitimacyConsent ?? false;

  // LOG EVERYTHING — YOU WILL SEE THIS IN CONSOLE
  React.useEffect(() => {
    // console.log("OWNER PROFILE FETCHED");
    // console.log("ownerId:", ownerId);
    // console.log("Full ownerProfileData:", ownerProfileData);
    // console.log(
    //   "hasAcceptedLegitimacyConsent from backend:",
    //   ownerProfileData?.hasAcceptedLegitimacyConsent
    // );
    // console.log("Final value used in UI:", hasAcceptedLegitimacyConsent);
    // console.log("isFetching:", isFetching, "| isLoading:", isOwnerLoading);
    // console.log("--------------------------------------------------");
  }, [ownerProfileData, isFetching, isOwnerLoading, ownerId]);

  // Log when refetch happens
  useFocusEffect(
    React.useCallback(() => {
      // console.log("Screen focused → forcing refetch for ownerId:", ownerId);
      ownerRefetch();
      verificationStatusRefetch();
    }, [ownerId, ownerRefetch, verificationStatusRefetch])
  );

  const handleConsentChange = async (value: boolean) => {
    console.log("User toggled consent to:", value);
    try {
      await patch({
        id: ownerId,
        data: {
          hasAcceptedLegitimacyConsent: value,
          consentAcceptedAt: new Date().toISOString(),
        },
      }).unwrap();
      console.log("Patch success → refetching owner data");
      ownerRefetch();
    } catch (error) {
      console.error("Patch failed:", error);
      Alert.alert("Error", "Failed to save consent");
    }
  };

  const onRefresh = React.useCallback(() => {
    console.log("Pull-to-refresh triggered");
    ownerRefetch();
    verificationStatusRefetch();
  }, [ownerRefetch, verificationStatusRefetch]);

  if (isOwnerLoading || verificationStatusLoading) {
    return <FullScreenLoaderAnimated />;
  }

  if (isOwnerError || verificationStatusError) {
    return <FullScreenErrorModal message="Failed to load data" />;
  }

  const allTypes = Object.keys(VerificationTypeMap) as VerificationType[];
  const submittedDocsMap = Object.fromEntries(
    (verificationStatusData?.verificationDocuments ?? []).map((doc) => [
      doc.verificationType,
      doc,
    ])
  );

  const verificationList = allTypes.map((type) => {
    const submitted = submittedDocsMap[type];
    return {
      type,
      meta: VerificationTypeMap[type],
      status: submitted ? submitted.verificationStatus : "MISSING",
      document: submitted || null,
    };
  });

  const statusStyles: Record<VerificationStatus, { bg: string; icon: string }> =
    {
      APPROVED: { bg: "#125e27", icon: "#34A853" },
      PENDING: { bg: "#6d5507", icon: "#FBBC05" },
      REJECTED: { bg: "#8a1609", icon: "#EA4335" },
      EXPIRED: { bg: "#063f8a", icon: "#4285F4" },
    };

  return (
    <StaticScreenWrapper
      refreshing={isFetching}
      onRefresh={onRefresh}
      style={[GlobalStyle.GlobalsContainer, s.container]}
      contentContainerStyle={[
        GlobalStyle.GlobalsContentContainer,
        s.containerStyle,
      ]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: Spacing.lg,
        }}
      >
        <Ionicons
          name={
            verificationStatusData?.verified
              ? "checkmark-circle"
              : "close-circle"
          }
          color={verificationStatusData?.verified ? "#34A853" : "red"}
          size={65}
        />
        <Text style={{ color: "white", fontSize: 43 }}>
          {verificationStatusData?.verified ? "Verified" : "Not Verified"}
        </Text>
      </View>

      <VStack style={s.cardHolder}>
        {verificationList.map((doc, index) => {
          console.log("doc: ", doc.document);
          const status = doc.status;
          const colors = statusStyles[status] ?? { bg: "#666", icon: "#999" };

          return (
            <View
              key={index}
              style={[s.cardContainer, { backgroundColor: colors.bg }]}
            >
              <Ionicons
                name={
                  status === "APPROVED"
                    ? "checkmark-circle"
                    : status === "REJECTED"
                    ? "close-circle"
                    : "time"
                }
                color={colors.icon}
                size={50}
              />
              <View>
                <Text style={s.cardText}>{doc.type}</Text>
                <Text style={s.cardTextSub}>{status}</Text>
              </View>
              <Button
                style={s.cardCta}
                onPress={() => {
                  if (status === "MISSING") {
                    navigate.navigate("VerificationSubmitScreen", {
                      userId: ownerId,
                      meta: { ...doc.meta, type: doc.type },
                    });
                  } else {
                    console.log();
                    navigate.navigate("VerificationViewScreen", {
                      userId: ownerId,
                      docId: doc.document.id,
                      meta: { ...doc.meta, type: doc.type },
                    });
                  }
                }}
              >
                <Text style={{ color: "white" }}>
                  {status === "MISSING" ? "Submit" : "View"}
                </Text>
              </Button>
            </View>
          );
        })}
      </VStack>

      {/* THIS IS WHERE THE TRUTH IS REVEALED */}
      <VStack style={{ marginTop: "auto", padding: Spacing.lg }}>
        {/* DEBUG TEXT — REMOVE LATER */}
        <Text
          style={{
            color: "yellow",
            fontSize: 14,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          DEBUG: Consent = {String(hasAcceptedLegitimacyConsent)} (from backend)
        </Text>

        <LegitmacyContsentComponent
          value={hasAcceptedLegitimacyConsent}
          onChange={handleConsentChange}
        />
      </VStack>

      {isFetching && !isOwnerLoading && <FullScreenLoaderAnimated />}
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: "column" },
  containerStyle: { flexGrow: 1, padding: Spacing.lg, alignItems: "center" },
  cardHolder: { gap: Spacing.md, width: "100%" },
  cardContainer: {
    flexDirection: "row",
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  cardCta: { marginLeft: "auto" },
  cardText: { color: Colors.TextInverse[1], fontSize: 16, fontWeight: "600" },
  cardTextSub: { color: Colors.TextInverse[1], fontSize: 12, opacity: 0.8 },
});
