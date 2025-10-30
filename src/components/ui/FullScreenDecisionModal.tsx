import React, { createContext, useContext, useState, ReactNode } from "react";
import DecisionModal from "@/components/ui/DecisionModal";

type ModalOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DecisionModalContextType = {
  showModal: (options: ModalOptions) => void;
};

const DecisionModalContext = createContext<DecisionModalContextType>({
  showModal: () => {},
});

export const useDecisionModal = () => useContext(DecisionModalContext);

export const GlobalDecisionModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({});

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setOptions({});
  };

  const handleConfirm = () => {
    options.onConfirm?.();
    hideModal();
  };

  const handleCancel = () => {
    options.onCancel?.();
    hideModal();
  };

  return (
    <DecisionModalContext.Provider value={{ showModal }}>
      {children}
      {/* Top-level overlay */}
      <DecisionModal
        visible={visible}
        title={options.title}
        message={options.message}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </DecisionModalContext.Provider>
  );
};
