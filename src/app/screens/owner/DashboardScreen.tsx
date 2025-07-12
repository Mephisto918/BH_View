import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Box, HStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

import {
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
  BorderRadius,
} from "@/constants";
import { VStack } from "@gluestack-ui/themed";

//redux
import { Ionicons } from "@expo/vector-icons";
import { Owner } from "@/stores/owners/owners.types";
import { useGetAllQuery } from "@/stores/boarding-houses/boarding-houses";
import { useDynamicUserApi } from "@/services/user/user.hooks";

const Dashboard = () => {
  const { selectedUser: data } = useDynamicUserApi();
  const user = data as Owner;

  const [isGrid, setIsGrid] = useState(false);

  const { selectedUser: userData } = useDynamicUserApi();
  const owner = userData as Owner;

  const {
    data: boardingHouses,
    isLoading: boardingHousesLoading,
    isError: boardingHousesError,
  } = useGetAllQuery({ ownerId: owner.id });

  const iconSize = 50;
  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <VStack
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          gap: Spacing.lg,
        }}
      >
        <VStack style={[s.Hero]}>
          <Text style={[s.Hero_text1]}> Dashboard</Text>
        </VStack>
        <VStack style={[s.Widget]}>
          <Box style={[s.Widget_item]}>
            <Ionicons name="home" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>
              {user.boardingHouses.length ?? 0}
            </Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="people" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{2}</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="book" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{0}</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="server" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{3}</Text>
          </Box>
        </VStack>

        <HStack
          style={{
            width: "100%",
            backgroundColor: Colors.PrimaryLight[6],
            borderColor: Colors.PrimaryLight[4],
            borderWidth: 1,
            borderRadius: BorderRadius.lg,
            justifyContent: "space-between",
            margin: 0,
            padding: 0,
          }}
        >
          <HStack
            style={{
              // borderColor: "red",
              // borderWidth: 3,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              flex: 1,
              margin: 0,
              padding: 10,
            }}
          >
            <TextInput
              placeholder="Search"
              placeholderTextColor="#bbb"
              iconSize={35}
              iconName="search"
              iconStyle={{
                color: "white",
              }}
              variant="primary"
              textInputStyle={{
                color: "white",
                fontSize: Fontsize.md,
              }}
            />
            {/* <Ionicons name="search" color="white" size={35} /> */}
          </HStack>
          <Button
            onPressAction={() => setIsGrid(!isGrid)}
            containerStyle={{
              backgroundColor: Colors.PrimaryLight[9],
              aspectRatio: 1,
              height: 50,
              // width: 10,
              margin: Spacing.md,
              // margin: Spacing.md,
              borderWidth: 1,
              padding: 0,
              borderRadius: BorderRadius.lg,
            }}
          >
            <Ionicons
              name={isGrid ? "grid" : "reorder-four"}
              color="white"
              size={20}
            />
          </Button>
        </HStack>
        <VStack
          style={{
            gap: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "flex-start",
            borderColor: "green",
            borderWidth: 1,
            // flex: 1,
          }}
        >
          {boardingHousesLoading && <Text>Loading boarding houses...</Text>}
          {boardingHousesError && <Text>Failed to load boarding houses.</Text>}
          {!boardingHousesLoading &&
            !boardingHousesError &&
            (!boardingHouses || boardingHouses.length === 0) && (
              <Text>No boarding houses found.</Text>
            )}
          {!boardingHousesLoading &&
            !boardingHousesError &&
            boardingHouses?.map((house) => (
              <Box
                key={house.id}
                style={{
                  borderRadius: BorderRadius.md,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: 20,
                  aspectRatio: 1,
                  height: "22.5%",
                  // width: "40%",
                  backgroundColor: Colors.PrimaryLight[9],
                }}
              >
                <HStack style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}>
                  <Ionicons name="home" color="white" size={30} />
                  <Text style={[s.generic_text_lg]}>{house.name}</Text>
                </HStack>
              </Box>
            ))}
        </VStack>

        {/* ---------------------------- testing overflow----------------------- */}
        {/* <VStack>
          {[0, 1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((i) => (
            <Box key={i} style={[s.Widget_item]}>
              <Text style={[s.generic_text_lg]}>A</Text>
            </Box>
          ))}
        </VStack> */}
        {/* ---------------------------- testing overflow-----------------------  */}
      </VStack>
    </StaticScreenWrapper>
  );
};

export default Dashboard;

const s = StyleSheet.create({
  StaticScreenWrapper: {
    // backgroundColor: Colors.PrimaryLight[8],
    padding: 10,
  },
  Hero: {
    // borderColor: "red",
    // borderWidth: 3,
  },
  Hero_text1: {
    fontSize: Fontsize.h2,
    fontWeight: "bold",
    color: Colors.TextInverse[2],
  },
  Widget: {
    // borderColor: 'red',
    // borderWidth: 3
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  Widget_item: {
    // borderColor: 'green',
    // borderWidth: 3,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    padding: 20,
    // height: 50,
    // width: Dimensions.get("window").width / 2,
    width: "40%",
    backgroundColor: Colors.PrimaryLight[9],
  },

  generic_text_sm: {
    fontSize: Fontsize.sm,
    color: Colors.TextInverse[2],
  },
  generic_text_md: {
    fontSize: Fontsize.md,
    color: Colors.TextInverse[2],
  },
  generic_text_lg: {
    fontSize: Fontsize.lg,
    color: Colors.TextInverse[2],
  },
});
