import { View, Text, StyleSheet} from 'react-native'
import React, {useMemo, useState, useEffect} from 'react'
import { Colors, Spacing, GlobalStyle } from '@/constants'

import { useRoute } from '@react-navigation/native'

// ui components
import ImageCarousel from '@/src/components/ui/ImageCarousel'

// laytou
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper'


// types
import BoardingHouseTypesProps from '../../types/screens/BoardinHouseTypes'

// BoardingHouseData: BoardingHouseTypesProps
const Booking = () => {
  const [BoardingHouse, setBoardingHouse] = useState<BoardingHouseTypesProps | null>(null);
  const route = useRoute()
  // const { data } = route.params || {}

  useEffect(() => {
    if (route.params?.data) {
      setBoardingHouse(route.params.data);
    }
  }, [route.params]);

  useEffect(() => {
    if (!route.params?.data) {
      console.warn("No data passed to this screen!");
    } else {
      // console.log("BoardingHouse data:", route.params?.data);
      console.log("BoardingHouse data: passed!");
    }
  }, []);

  return (
    <StaticScreenWrapper
      scrollable={true}
    >
      <View style={[GlobalStyle.Globals, s.main_container]}>
        <View style={[s.main_item]}>
          <View style={[s.group_main]}>
              <View
                style={{
                  minHeight: 300,
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  zIndex: 5,
                  // position: 'relative'
                }}
              >
              <ImageCarousel
                variant='primary'
                images={BoardingHouse?.images || []}
              />
              </View>
              {BoardingHouse && (
                <View
                  style={{
                    // zIndex: -1,
                    marginTop: -10,
                    padding: 10,
                    flex: 1,
                    // borderColor: 'red',
                    // borderWidth: 3,
                    width: '100%'
                  }}
                >
                  <Text>{BoardingHouse?.name}</Text>
                  <Text>{BoardingHouse?.description}</Text>
                  {BoardingHouse.ameneties && BoardingHouse.ameneties.map((amenety, index) => (
                    <Text key={index}>{amenety}</Text>
                  ))}
                  <Text>{BoardingHouse?.address}</Text>
                  <Text>{BoardingHouse?.location?.region}</Text>
                  <Text>{BoardingHouse?.location?.barangay}</Text>
                  <Text>{BoardingHouse?.properties?.floorArea}</Text>
                  <Text>{BoardingHouse?.properties?.roomType}</Text>
                  <Text>{BoardingHouse?.properties?.bathrooms}</Text>
                  <Text>Kitchen: {BoardingHouse?.properties.kitchen}</Text>
                  <Text>Furnished: {BoardingHouse?.properties?.furnished}</Text>
                  <Text>Price: {BoardingHouse?.price}</Text>

                </View>
              )}
          </View>
        </View>
      </View>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  main_item:{
    flex: 1,
    width: '100%',
  },

  group_main:{
    flex: 1,
    paddingTop: Spacing.md,
    paddingRight: Spacing.md,
    paddingLeft: Spacing.md,
    backgroundColor: Colors.PrimaryLight[8],
    flexDirection: 'column',
    alignItems: 'baseline'
  },


})

export default Booking;