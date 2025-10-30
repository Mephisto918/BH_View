import React, { useEffect } from "react";
import { Alert, AlertButton } from "react-native";

interface FullScreenErrorModalProps {
  message?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

export default function FullScreenErrorModal({
  message = "Failed to fetch details.",
  onRetry,
  onCancel,
}: FullScreenErrorModalProps) {
  useEffect(() => {
    const buttons: AlertButton[] = [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancel,
      },
    ];

    if (onRetry) {
      buttons.push({ text: "Retry", onPress: onRetry });
    }

    Alert.alert("Error", message, buttons, {
      cancelable: true,
      onDismiss: onCancel,
    });
  }, [message, onRetry, onCancel]);

  return null;
}
