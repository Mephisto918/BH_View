import { View, Text } from "react-native";
import React from "react";
import { Portal } from "@gorhom/portal";
import DocumentFullScreenModal from "./DocumentFullScreenModal";

type ContextType = {
  showDocumentFullscreen: (uri: string) => void;
  hideDocumentFullscreen: () => void;
  isVisible: boolean;
  documentUri: string | null;
};

const Context = React.createContext<ContextType>({
  showDocumentFullscreen: () => {},
  hideDocumentFullscreen: () => {},
  isVisible: false,
  documentUri: null,
});

export const useDocumentFullScreenModal = () => React.useContext(Context);

export default function GlobalDocumentFullScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [documentUri, setDocumentUri] = React.useState<string | null>(null);

  const showDocumentFullscreen = React.useCallback(
    (uri: string) => {
      if (isVisible) return;
      setIsVisible(true);
      setDocumentUri(uri);
    },
    [isVisible]
  );

  const hideDocumentFullscreen = React.useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setDocumentUri(null), 300);
  }, []);

  return (
    <Context.Provider
      value={{
        showDocumentFullscreen,
        hideDocumentFullscreen,
        isVisible,
        documentUri,
      }}
    >
      {children}

      <Portal name="DocumentFullScreenPortalRoot">
        //! Solved! debuuged 3 hours, the Modal Component inside this children
        //! collapses as it cant inferer to the Portal components height, needs
        //! at least one component to define a container size
        {isVisible && (
          <View>
            <DocumentFullScreenModal
              visible={isVisible}
              documentUri={documentUri}
              onClose={hideDocumentFullscreen}
            />
          </View>
        )}
      </Portal>
    </Context.Provider>
  );
}
