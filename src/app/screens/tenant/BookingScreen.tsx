import { View, Text, StyleSheet} from 'react-native'
import React, { useState, useEffect} from 'react'
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
                images={BoardingHouse?.images ?? []}
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
                    // borderWidth: 10,
                    width: '100%'
                  }}
                >
                  <Text style={[s.text_title]}>{BoardingHouse?.name}</Text>
                  <Text style={[s.text_description]}>{BoardingHouse?.description}</Text>
                  <Text style={[s.text_address]}>{BoardingHouse?.address}</Text>
                  <Text style={[s.text_price]}>Price: {BoardingHouse?.price}</Text>
                  <View style={[s.text_ameneties]}>
                    {BoardingHouse?.ameneties?.map((key, index) => (
                      <Text key={index} >{BoardingHouse.ameneties[index]}</Text>
                    ))}
                  </View>
                  {/* <Text>{BoardingHouse?.location?.barangay}</Text> */}
                  <View style={[s.text_properties]}>
                    {BoardingHouse?.properties?.map((prop, index) => {
                      const key = Object.keys(prop)[0];
                      const value = prop[key];
                      return (
                        <Text key={index}>
                          {key.replace(/_/g, ' ')}: {value}
                        </Text>
                      );
                    })}
                  </View>

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

  text_title:{
    borderColor: 'red',
    borderWidth: 3,
  },
  text_description:{
    borderColor: 'white',
    borderWidth: 3,
  },
  text_ameneties:{
    borderColor: 'green',
    borderWidth: 3,
  },
  text_address:{
    borderColor: 'orange',
    borderWidth: 3,
  },
  text_price: {
    borderColor: 'cyan',
    borderWidth: 3,
  },
  text_properties:{
    borderColor: 'magenta',
    borderWidth: 3,
  }
})

export default Booking;