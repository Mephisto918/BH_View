import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { HStack, Spinner, VStack } from "@gluestack-ui/themed";
import { overlay as Overlay } from "react-native-paper";

import Mapview, { Marker, Polygon } from "react-native-maps";
import {
  Colors,
  GlobalStyle,
  Fontsize,
  Spacing,
  BorderRadius,
} from "@/constants";

//navigation
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TenantTabsParamList } from "../../tenant/navigation/tenant.tabs.types";

// ui component
import HeaderSearch from "../../../components/HeaderSearch";
import Button from "@/components/ui/Button";

// ui lib
import BottomSheet from "@gorhom/bottom-sheet";

//types
import { ScrollView } from "react-native-gesture-handler";

// constants
import { DEFAULT_REGION } from "@/app/config/map.config";

// redux
import { useGetAllQuery as useGetAllBoardingHouses } from "@/infrastructure/boarding-houses/boarding-house.redux.slice";
import { useDispatch } from "react-redux";
import { selectBoardinHouse } from "@/infrastructure/boarding-houses/boarding-house.redux.slice";
import {
  BoardingHouse,
  GetBoardingHouse,
} from "@/infrastructure/boarding-houses/boarding-house.schema";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

export default function MapMainScreen() {
  const [search, setSearch] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "70%"], []);
  const [sheetData, setDataSheet] = useState<GetBoardingHouse | null>(null);
  // const [sheetThumbnail, setSheetThumbnail] = useState<BoardingHouseImage | null>(null)

  const dispatch = useDispatch();

  const {
    data: boardinghouses,
    isLoading: isBoardingHousesLoading,
    isError: isBoardingHousesError,
  } = useGetAllBoardingHouses();

  useEffect(() => {
    console.log("bh: ", boardinghouses);
  }, [isBoardingHousesLoading]);

  const navigation =
    useNavigation<BottomTabNavigationProp<TenantTabsParamList>>();

  const onChangeInputValue = (text: string) => {
    setSearch(text);
  };

  const handleMarkerPress = (data: GetBoardingHouse) => {
    setDataSheet(data);
    bottomSheetRef.current?.expand();
  };

  const handleGotoPress = () => {
    if (!sheetData) return;
    // dispatch(selectBoardinHouse(sheetData));
    console.log("handleGotoPress id ", sheetData.id);
    navigation.navigate("Booking", {
      screen: "BoardingHouseDetails",
      params: { id: sheetData.id, fromMaps: true },
    });
  };

  // LogBox.ignoreLogs([]); // <-- Don't ignore anything temporarily

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.con_main]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {/* {isBoardingHousesLoading && (
        <Overlay isOpen={true}>
          <Spinner size="large" color="$white" />
        </Overlay>
      )} */}
      <HeaderSearch
        containerStyle={s.search_headerContainer}
        textPlaceHolderStyle={s.search_headerText}
        placeholder="Search"
        value={search}
        onChangeText={onChangeInputValue}
      />
      <Mapview
        style={s.map}
        initialRegion={DEFAULT_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider="google"
        mapType="hybrid"
      >
        {/** add loading touches and error later */}
        {!isBoardingHousesLoading &&
          (boardinghouses ?? []).map((house: BoardingHouse, i) => {
            const location = house.location;

            if (
              !location ||
              !location.coordinates ||
              location.coordinates.length !== 2
            )
              return null;

            const [lng, lat] = location.coordinates;

            return (
              <Marker
                key={i}
                onPress={() => handleMarkerPress(house)}
                pinColor={house.availabilityStatus ? "green" : "blue"}
                coordinate={{ latitude: lat, longitude: lng }}
                title={house.name}
                description={house.description}
              />
            );
          })}

        <Marker
          coordinate={{
            latitude: 11.0008519,
            longitude: 124.6095,
          }}
          title="Black Whole ni Inigma"
          description="Wanako kaduwag dota 2"
        />
        <Polygon
          coordinates={[
            { latitude: 11.0015, longitude: 124.608 },
            { latitude: 11.002, longitude: 124.61 },
            { latitude: 11.0, longitude: 124.612 },
            { latitude: 10.999, longitude: 124.61 },
            { latitude: 11.0, longitude: 124.608 },
          ]}
          holes={[
            [
              { latitude: 11.001, longitude: 124.609 },
              { latitude: 11.0012, longitude: 124.6095 },
              { latitude: 11.0008, longitude: 124.6097 },
            ],
          ]}
          strokeWidth={2}
          strokeColor="blue"
          fillColor="rgba(0,0,255,0.3)"
        ></Polygon>
      </Mapview>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backgroundStyle={{ backgroundColor: Colors.PrimaryLight[8] }}
        style={
          {
            // zIndex: 20,
          }
        }
      >
        {
          /* kay bsin object daw Array.isArray(sheetData)*/ sheetData && (
            <View
              style={{
                // padding: Global,
                backgroundColor: Colors.PrimaryLight[8],
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <Image
                source={
                  sheetData.thumbnail
                    ? { uri: sheetData?.thumbnail[0] }
                    : require("../../../assets/housesSample/1.jpg")
                }
                style={{
                  // borderColor: "red",
                  // borderWidth: 2,
                  margin: "auto",
                  width: "98%",
                  height: 200,
                  borderRadius: BorderRadius.md,
                }}
              />
              <View
                style={{
                  marginTop: Spacing.sm,
                  alignItems: "baseline",
                  padding: Spacing.md,
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    height: 300,
                    marginBottom: Spacing.sm,
                  }}
                >
                  <HStack
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      gap: 10,
                      backgroundColor: Colors.PrimaryLight[7],
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <VStack style={{ width: "75%" }}>
                      <Text style={[s.text_title]}>{sheetData.name}</Text>
                      <Text style={[s.text_address]}>{sheetData.address}</Text>
                    </VStack>
                    <Button
                      title="Goto?"
                      onPressAction={handleGotoPress}
                      containerStyle={{
                        padding: 10,
                      }}
                    />
                  </HStack>
                  <ScrollView
                    style={{
                      marginTop: Spacing.md,
                      flex: 1,
                      // borderColor: "red",
                      // borderWidth: 1,
                      padding: 10,
                      borderRadius: BorderRadius.md,
                      backgroundColor: Colors.PrimaryLight[7],
                    }}
                  >
                    <Text style={[s.text_white, { marginBottom: 20 }]}>
                      {sheetData.description}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          )
        }
      </BottomSheet>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  con_main: {},
  map: {
    // ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  search_headerContainer: {
    position: "absolute",
    width: "90%",
    height: 50,
    backgroundColor: Colors.PrimaryLight[7],
    top: "5%",
    left: "5%",
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,

    zIndex: 10,
  },
  search_headerText: {
    // backgroundColor: "red",
    fontSize: Fontsize.lg,
    color: Colors.PrimaryLight[8],
  },
  callout: {
    padding: 10,
  },
  text_white: {
    color: "white",
  },
  text_address: {
    fontSize: Fontsize.sm,
    paddingTop: 5,
    color: Colors.TextInverse[2],

    // borderColor: "red",
    // borderWidth: 3,
  },
  text_title: {
    // borderColor: "red",
    // borderWidth: 3,
    color: Colors.TextInverse[1],
    fontSize: Fontsize.xxl,
    fontWeight: 900,
  },
});
