import React from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed";

interface BottomSheetSelectorProps<T> {
  values: T[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: T) => void;
}

export default function BottomSheetSelector<T>({
  values,
  isOpen,
  onClose,
  onSelect,
}: BottomSheetSelectorProps<T>) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        {values.map((option, index) => (
          <ActionsheetItem
            key={index}
            onPress={() => {
              onSelect(option);
              onClose();
            }}
          >
            <ActionsheetItemText>{String(option)}</ActionsheetItemText>
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  );
}
