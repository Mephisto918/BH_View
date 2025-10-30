import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { BorderRadius, Colors, Fontsize, GlobalStyle } from "@/constants";
import { Box, Image, VStack } from "@gluestack-ui/themed";
import { useGetAllQuery as useGetAllBoardingHouses } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import {
  // GetBoardingHouse,
  QueryBoardingHouse,
} from "@/infrastructure/boarding-houses/boarding-house.schema";
import { ScrollView } from "react-native-gesture-handler";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TenantTabsParamList } from "../../navigation/tenant.tabs.types";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";
import HeaderSearch from "@/components/HeaderSearch";
import { useDispatch, useSelector } from "react-redux";
import genericSearchBarSlice, {
  setQuery,
  setResults,
} from "../../../../infrastructure/redux-utils/genericSearchBar.slice";
import { RootState } from "@/application/store/stores";
import useDebounce from "@/infrastructure/utils/debounc.hook";
import ComponentLoaderAnimated from "@/components/ui/ComponentLoaderAnimated";

export default function BookingListsScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<TenantTabsParamList>>();

  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.genericSearch.query
  );
  const searchResults = useSelector(
    (state: RootState) => state.genericSearch.results
  );

  const [filters, setFilters] = useState<QueryBoardingHouse>({
    minPrice: 1500,
  });
  const [page, setPage] = useState(1); // current page
  const [allBoardingHouses, setAllBoardingHouses] = useState<
    QueryBoardingHouse[]
  >([]);
  const offset = 10; // items per page

  const {
    data: boardinghousesPage,
    isLoading: isBoardingHousesLoading,
    isError: isBoardingHousesError,
  } = useGetAllBoardingHouses({
    ...filters,
    page,
    offset,
  });

  useEffect(() => {
    if (!boardinghousesPage) return;
    setAllBoardingHouses((prev) => [...prev, ...boardinghousesPage]);
  }, [boardinghousesPage]);

  const debouncedQuery = useDebounce(searchQuery, 150);

  useEffect(() => {
    const query = (debouncedQuery || "").toLowerCase();

    const filtered = allBoardingHouses
      .filter(
        (bh) =>
          bh.id != null &&
          bh.name != null &&
          bh.name.toLowerCase().includes(query)
      )
      .map((bh) => ({
        id: bh.id!, // non-null assertion
        name: bh.name!,
        thumbnail: bh.thumbnail,
        address: bh.address,
        capacity: bh.capacity,
      }));

    dispatch(setResults(filtered));
  }, [debouncedQuery, allBoardingHouses, dispatch]);

  const handleGotoPress = (id: number) => {
    // console.log("handleGotoPress", id);
    navigation.navigate("Booking", {
      screen: "BoardingHouseDetails",
      params: { id: id, fromMaps: true },
    });
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {isBoardingHousesError && <FullScreenErrorModal />}
      <VStack style={{ flex: 1 }}>
        <HeaderSearch
          placeholder="Search boarding houses"
          value={searchQuery}
          setValue={(val) => {
            dispatch(setQuery(val));
          }}
          containerStyle={{
            backgroundColor: Colors.PrimaryLight[7],
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,

            zIndex: 10,
          }}
        />
        {isBoardingHousesLoading && <ComponentLoaderAnimated />}
        <ScrollView
          style={{
            backgroundColor: Colors.PrimaryLight[8],
            flex: 1,
          }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10,
            padding: 10,
          }}
        >
          {searchResults.length === 0 ? (
            <Text style={styles.Item_SubLabel}>
              {searchQuery
                ? "No boarding houses found"
                : "Start typing to search"}
            </Text>
          ) : (
            searchResults.map((boardinghouse: QueryBoardingHouse, index) => {
              return (
                <VStack
                  key={index}
                  style={{
                    backgroundColor: Colors.PrimaryLight[9],
                    padding: 10,
                    borderRadius: BorderRadius.md,
                    gap: 10,
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <Image
                      source={
                        boardinghouse?.thumbnail?.[0]?.url
                          ? { uri: boardinghouse.thumbnail[0].url }
                          : require("../../../../assets/housesSample/1.jpg")
                      }
                      style={{
                        height: 150,
                        aspectRatio: 4 / 3,
                        borderRadius: BorderRadius.md,
                      }}
                    />
                  </Box>
                  <VStack style={{ flex: 1 }}>
                    <VStack style={{ flex: 1 }}>
                      <Text
                        style={[styles.Item_Label]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {boardinghouse.name}
                      </Text>
                      <Text style={[styles.Item_SubLabel]}>
                        {boardinghouse.address}
                      </Text>
                    </VStack>
                    <VStack>
                      <Text style={[styles.Item_SubLabel]}>
                        {boardinghouse.capacity?.currentCapacity ?? 0}/
                        {boardinghouse.capacity?.totalCapacity ?? 0}
                      </Text>
                      <Pressable
                        onPress={() => handleGotoPress(boardinghouse.id ?? 0)}
                        style={{
                          borderRadius: BorderRadius.sm,
                          padding: 8,
                          backgroundColor: Colors.PrimaryLight[6],
                          marginLeft: "auto",
                        }}
                      >
                        <View>
                          <Text style={[styles.Item_Normal]}>View</Text>
                        </View>
                      </Pressable>
                    </VStack>
                  </VStack>
                </VStack>
              );
            })
          )}
          {boardinghousesPage?.length &&
            boardinghousesPage.length >= offset && (
              <Pressable
                onPress={() => setPage((prev) => prev + 1)}
                style={{
                  padding: 12,
                  backgroundColor: Colors.PrimaryLight[6],
                  borderRadius: BorderRadius.md,
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ color: Colors.TextInverse[2], fontWeight: "bold" }}
                >
                  Show More
                </Text>
              </Pressable>
            )}
        </ScrollView>
      </VStack>
    </StaticScreenWrapper>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it's above everything
  },
  generic_text: {
    color: Colors.TextInverse[2],
  },
  Item_Label: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.xl,
    marginBottom: 6,
    flexWrap: "wrap",
    // flexShrink: 1,
  },
  Item_SubLabel: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.lg,
    marginBottom: 6,
  },
  Item_Normal: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.md,
  },
  Item_Input_Placeholder: {
    color: Colors.TextInverse[2],
    fontSize: Fontsize.md,
  },
});
