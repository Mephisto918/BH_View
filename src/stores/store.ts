import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { boardingHouseApi } from './slices/apiSlice';

export const store = configureStore({
  reducer:{
    // user: userReducer,
    auth: authReducer,

    // mao ni explanation ni gpt 
    // boardingHouseApi.reducerPath returns a string — usually it's 'boardingHouseApi' unless you set something else.
    // That string becomes the key.
    // boardingHouseApi.reducer is the actual function that handles API cache and request state.
    [boardingHouseApi.reducerPath]: boardingHouseApi.reducer
    //////////////////////////////////////////////////////

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardingHouseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






// bg api usage 
// import { useGetBoardingHousesQuery } from '../redux/apiSlice';

// const MapScreen = () => {
//   const { data, error, isLoading } = useGetBoardingHousesQuery();

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error loading data</Text>;

//   return (
//     <MapView>
//       {data?.map((place) => (
//         <Marker
//           key={place.id}
//           coordinate={{ latitude: place.lat, longitude: place.lng }}
//           title={place.name}
//         />
//       ))}aaaa
//     </MapView>
//   );
// };