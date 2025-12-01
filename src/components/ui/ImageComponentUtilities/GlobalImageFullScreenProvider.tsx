import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Portal } from "@gorhom/portal";
import ImageFullScreenModal from "./ImageFullScreenModal";
import { View, styled } from "@gluestack-ui/themed";

type ContextType = {
  showImageFullscreen: (uri: string) => void;
  hideImageFullscreen: () => void;
  isVisible: boolean;
  imageUri: string | null;
};

const Context = createContext<ContextType>({
  showImageFullscreen: () => {},
  hideImageFullscreen: () => {},
  isVisible: false,
  imageUri: null,
});

export const useImageFullScreenModal = () => useContext(Context);

export const GlobalImageFullScreenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const showImageFullscreen = useCallback(
    (uri: string) => {
      if (isVisible) return;
      setIsVisible(true);
      setImageUri(uri);
    },
    [isVisible]
  );

  const hideImageFullscreen = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setImageUri(null), 300);
  }, []);

  return (
    <Context.Provider
      value={{ showImageFullscreen, hideImageFullscreen, isVisible, imageUri }}
    >
      {children}

      <Portal name="ImageFullScreenPortalRoot">
        //! Solved! debuuged 3 hours, the Modal Component inside this children
        //! collapses as it cant inferer to the Portal components height, needs
        //! at least one component to define a container size
        {isVisible && (
          <View>
            <ImageFullScreenModal
              visible={isVisible}
              imageUri={imageUri}
              onClose={hideImageFullscreen}
            />
          </View>
        )}
      </Portal>
    </Context.Provider>
  );
};
