import { View, Text, StyleSheet, Image } from 'react-native'
import React,{useState, useRef, useMemo, useEffect} from 'react'

import Mapview, { Marker, Polygon ,} from 'react-native-maps'
import { Colors, GlobalStyle, Fontsize, Spacing } from '@/constants';

//navigation
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TenantTabsParamList } from '../../types/navigation/navigationTypes';

// ui component
import HeaderSearch from '../../../components/HeaderSearch';
import Button from '@/src/components/ui/Button';

// ui lib
import BottomSheet from '@gorhom/bottom-sheet';

// mock
// import mockBoardingHouses from '@/src/tests/BoardinHouseEntity';

//types
import BoardingHouseTypesProps from '../../types/screens/BoardinHouseTypes';
import { ScrollView } from 'react-native-gesture-handler';

// redux too; or rtk query
import { useGetBoardingHousesQuery } from '@/src/stores/slices/apiSlice';
// import api from '@/src/config/api'

export default function Map() {
  const [search,setSearch] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(()=>['25%', '50%'],[]);
  const [sheetData, setDataSheet] = useState<BoardingHouseTypesProps|null>(null); 
  // const [data, setData] = useState<BoardingHouseTypesProps | null>(null);
  // const [error, setError] = useState(null);


  const { data: boardingHouses, error, isLoading } = useGetBoardingHousesQuery()
  // const q = useGetBoardingHousesQuery()
  // console.log(q)
  // console.log(boardingHouses

//   useEffect(() => {
//     const fetchBoardingHouses = async () => {
//       try {
//         const response = await fetch(`${api.BASE_URL}${api.PORT}/api/boarding_houses`);
//         if (!response.ok) {
//           throw new Error(`Server error: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log('✅ Fetched data:', json);
//         setData(json);
//       } catch (err) {
//         console.error('❌ Fetch failed:', err.message);
//         setError(err.message);
//       }
//     };

//     fetchBoardingHouses();
// }, []);


  const navigation = useNavigation<BottomTabNavigationProp<TenantTabsParamList>>();

  const region = {
    latitude: 11.0008519,         
    longitude: 124.609500,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const onChangeInputValue = (text: string) =>{
    setSearch(text)
  }

  const handleMarkerPress = (data: BoardingHouseTypesProps) =>{
    setDataSheet(data);
    bottomSheetRef.current?.expand();
  }

  const handleGotoPress = ()=>{
    console.log(sheetData)
    navigation.navigate('BookingScreen', {data: sheetData});
  }
  return (
    <View style={[GlobalStyle.Globals,s.con_main]}>
      <HeaderSearch 
        containerStyle={s.search_headerContainer}
        textPlaceHolderStyle={s.search_headerText}
        placeholder="Search" 
        value={search}
        onChangeText={onChangeInputValue} 
      />
      <Mapview
        style={s.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider="google"
        mapType='hybrid'
      >
        {Array.isArray(boardingHouses) && boardingHouses.map((house, i)=>(
          <Marker 
            onPress={()=>handleMarkerPress(house)}
            pinColor={house?.availability_status ? 'green' : 'blue'}
            key={i}
            coordinate={{
              latitude: house?.location?.latitude,
              longitude: house?.location?.longitude,
            }}
            title={house?.name}
            description={house?.description}
          />
        ))}
        <Marker 
          coordinate={{
            latitude: 11.0008519,
            longitude: 124.609500,
          }}
          title="Black Whole ni Inigma"
          description="Wanako kaduwag dota 2"
        />
        <Polygon
          coordinates={[
            { latitude: 11.0015, longitude: 124.6080 },
            { latitude: 11.0020, longitude: 124.6100 },
            { latitude: 11.0000, longitude: 124.6120 },
            { latitude: 10.9990, longitude: 124.6100 },
            { latitude: 11.0000, longitude: 124.6080 },
          ]}

          holes={[
            [
              { latitude: 11.0010, longitude: 124.6090 },
              { latitude: 11.0012, longitude: 124.6095 },
              { latitude: 11.0008, longitude: 124.6097 },
            ],
          ]}
          strokeWidth={2}
          strokeColor="blue"
          fillColor="rgba(0,0,255,0.3)"
        >
        </Polygon>
      </Mapview>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backgroundStyle={{backgroundColor: Colors.PrimaryLight[8]}}
        style={{
          // zIndex: 20, 
        }}
      >
        {Array.isArray(sheetData) && (
          <View style={{ 
            // padding: Global, 
            backgroundColor: Colors.PrimaryLight[8],
            flex: 1
          }}>
            <Image 
              source={sheetData.images === undefined ? require('../../../assets/img_resources/24.jpg') : (typeof sheetData.images[0].img === 'string' ? { uri: sheetData.images[0].img } : sheetData.images[0].img)}
              style={{borderColor: 'red', borderWidth: 2, width: '100%', height: 200}}  
            />
            <ScrollView style={{ flex: 1,}}>
              <View
                style={{
                  alignItems: 'baseline',
                  padding: Spacing.md,
                  flexDirection: 'row',
                  // justifyContent: 'flex-start',    
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderWidth: 2,
                    borderColor: 'green',
                  }}
                >
                  <Text>{sheetData.name}</Text>
                  <Text>This is your bottom sheet content.</Text>
                  <Text>{sheetData.description}</Text>
                </View>
                <Button title='Goto?' onPressAction={handleGotoPress} 
                  containerStyle={{
                    marginLeft: Spacing.md
                  }}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </BottomSheet>
    </View>
  )
}

const s = StyleSheet.create({
  con_main:{
    flex: 1,
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  },
  search_headerContainer:{
    width: '90%',
    height: 40,
    backgroundColor: Colors.PrimaryLight[8],
    top: '5%',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,

    zIndex: 10
  },
  search_headerText:{
    fontSize: Fontsize.xl,
  },
  callout:{
    padding: 10
  }
})