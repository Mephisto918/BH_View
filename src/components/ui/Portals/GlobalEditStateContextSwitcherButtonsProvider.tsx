import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Portal } from "@gorhom/portal";
import { View } from "react-native";
import EditStateContextSwitcherButtons from "./EditStateContextSwitcherButtons"; // Your button component

type ContextType = {
  showButtons: (options?: {
    onEdit?: () => void;
    onSave?: () => void;
    onDiscard?: () => void;
  }) => void;
  hideButtons: () => void;
  isVisible: boolean;
};

const Context = createContext<ContextType>({
  showButtons: () => {},
  hideButtons: () => {},
  isVisible: false,
});

export const useEditStateContextSwitcherButtons = () => useContext(Context);

export const GlobalEditStateContextSwitcherButtonsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [callbacks, setCallbacks] = useState<{
    onEdit?: () => void;
    onSave?: () => void;
    onDiscard?: () => void;
  }>({});

  const showButtons = useCallback((options?: typeof callbacks) => {
    if (options) setCallbacks(options);
    setIsVisible(true);
  }, []);

  const hideButtons = useCallback(() => setIsVisible(false), []);

  const handleEdit = () => {
    setIsEditing(true);
    callbacks.onEdit?.();
  };

  const handleSave = () => {
    setIsEditing(false);
    callbacks.onSave?.();
  };

  const handleDiscard = () => {
    setIsEditing(false);
    callbacks.onDiscard?.();
  };

  return (
    <Context.Provider value={{ showButtons, hideButtons, isVisible }}>
      {children}

      <Portal name="EditContextSwitchingPortal">
        {isVisible && (
          <View style={{ position: "absolute", right: 5, top: 15 }}>
            <EditStateContextSwitcherButtons
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onDiscard={handleDiscard}
            />
          </View>
        )}
      </Portal>
    </Context.Provider>
  );
};
