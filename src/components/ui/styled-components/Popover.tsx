// components/ui/popover.tsx
import { createPopover } from "@gluestack-ui/popover";
import { styled } from "@gluestack-ui/themed"; // or your styled util

// You can use simple Box components from Gluestack for the subcomponents
export const Root = styled.View({});
export const Arrow = styled.View({});
export const Content = styled.View({
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 10,
});
export const Header = styled.View({});
export const Footer = styled.View({});
export const Body = styled.View({});
export const Backdrop = styled.View({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.2)",
});
export const CloseButton = styled.TouchableOpacity({});

export const Popover = createPopover({
  Root,
  Arrow,
  Content,
  Header,
  Footer,
  Body,
  Backdrop,
  CloseButton,
});
