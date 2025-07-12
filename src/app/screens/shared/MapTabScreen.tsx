import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";

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
import { TenantTabsParamList } from "../../types/navigation";

// ui component
import HeaderSearch from "../../../components/HeaderSearch";
import Button from "@/components/ui/Button";

// ui lib
import BottomSheet from "@gorhom/bottom-sheet";

//types
import { ScrollView } from "react-native-gesture-handler";

// constants
import { DEFAULT_REGION } from "@/config/map.config";

// redux
import { useGetAllQuery as useGetAllBoardingHouses } from "@/stores/boarding-houses/boarding-houses";
import {
  BoardingHouse,
  BoardingHouseImage,
} from "@/stores/boarding-houses/boarding-houses.types";
import { useDispatch } from "react-redux";
import { selectBoardinHouse } from "@/stores/boarding-houses/boarding-houses";
import { HStack, VStack } from "@gluestack-ui/themed";

export default function Map() {
  const [search, setSearch] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "70%"], []);
  const [sheetData, setDataSheet] = useState<BoardingHouse | null>(null);
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

  const handleMarkerPress = (data: BoardingHouse) => {
    setDataSheet(data);
    bottomSheetRef.current?.expand();
  };

  const handleGotoPress = () => {
    if (!sheetData) return;
    dispatch(selectBoardinHouse(sheetData));
    navigation.navigate("BookingScreen", { id: sheetData.id });
  };

  // LogBox.ignoreLogs([]); // <-- Don't ignore anything temporarily

  return (
    <View style={[GlobalStyle.Globals, s.con_main]}>
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
          (boardinghouses ?? [])
            .filter((house) => {
              const coords = house?.location?.coordinates?.coordinates;
              const valid =
                Array.isArray(coords) &&
                coords.length === 2 &&
                coords.every((v) => typeof v === "number");
              if (!valid) {
                console.warn("Skipping invalid marker", {
                  houseId: house?.id,
                  location: house?.location,
                });
              }
              return valid;
            })
            .map((house: BoardingHouse, i) => (
              <Marker
                key={i}
                onPress={() => handleMarkerPress(house)}
                pinColor={house.availabilityStatus ? "green" : "blue"}
                coordinate={{
                  latitude: house.location.coordinates.coordinates[1], // Y = lat
                  longitude: house.location.coordinates.coordinates[0], // X = lng
                }}
                title={house.name}
                description={house.description}
              />
            ))}

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
              }}
            >
              <Image
                source={
                  sheetData?.thumbnail
                    ? { uri: sheetData?.thumbnail }
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
              <ScrollView style={{ flex: 1 }}>
                <View
                  style={{
                    marginTop: Spacing.sm,
                    alignItems: "baseline",
                    padding: Spacing.md,
                    flexDirection: "column",
                    // borderWidth: 2,
                    // borderColor: "white",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      // borderWidth: 2,
                      // borderColor: "green",
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
                        <Text style={[s.text_address]}>
                          {sheetData.address}
                        </Text>
                      </VStack>
                      <Button
                        title="Goto?"
                        onPressAction={handleGotoPress}
                        containerStyle={
                          {
                            // marginBottom: Spacing.lg,
                            // alignSelf: "flex-end",
                            // marginLeft: 0,
                            padding: 10,
                            // marginRight: Spacing.lg,
                          }
                        }
                      />
                    </HStack>
                    <Text style={[s.text_white]}>
                      This is your bottom sheet content. asdasd as dasda s a das
                      dasd asdasdasda sd asda da sdasd a dad sda sda sd asda
                      sdasd as dasd asd ad adas asdasdaadsasdasd asd
                      adsadsasdsdasdasd asd asd asdad as
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          )
        }
      </BottomSheet>
    </View>
  );
}

const s = StyleSheet.create({
  con_main: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search_headerContainer: {
    width: "90%",
    height: 40,
    backgroundColor: Colors.PrimaryLight[8],
    top: "5%",
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,

    zIndex: 10,
  },
  search_headerText: {
    fontSize: Fontsize.xl,
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
