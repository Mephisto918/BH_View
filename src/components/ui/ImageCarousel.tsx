import { View, ScrollView, TouchableOpacity, Image, StyleProp, ViewStyle} from 'react-native'
import React, { useState, } from 'react'
import { BorderRadius, BorderWidth, Colors, ShadowLight, Spacing } from '@/constants'

interface CarouselProps {
  images: Array<string | undefined>
  variant?: 'primary' | 'secondary' | 'fullBleed'
  containerStyle?: StyleProp<ViewStyle>
  scrollStyle?: StyleProp<ViewStyle>
}

const ImageCarousel = ({images, variant = 'primary', scrollStyle, containerStyle}: CarouselProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  
  const setSelectedIndex = (i: number) =>{
    setImageIndex(i);
    setMainImage(i);
  }
  

  const variantStyle: Record<string, any> = {
    primary:{
      container:{
        flex: 1, 
        borderColor: Colors.PrimaryLight[6],
        backgroundColor: Colors.PrimaryLight[7],
        borderWidth: BorderWidth.lg,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...ShadowLight.xl
      },
      mainImage: {
        height: 296,
        aspectRatio: 16 / 9,
        alignSelf: 'center',
      },
      carousel:{
        padding: Spacing.md,
        gap: Spacing.base,
      },
      carousel_item_definition:{
        borderRadius: BorderRadius.md,
        borderColorSelected: Colors.PrimaryLight[2],
        borderColorNotSelected: Colors.PrimaryLight[9],
      },
      thumbnailSize: 80,
    },
    secondary:{
      container:{
        flex: 1, 
        borderColor: Colors.PrimaryLight[8],
        backgroundColor: Colors.PrimaryLight[3],
        borderWidth: BorderWidth.lg,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...ShadowLight.xl
      },
      mainImage: {
        height: 296,
        aspectRatio: 16 / 9,
        alignSelf: 'center',
      },
      carousel:{
        padding: Spacing.md,
        gap: Spacing.base,
      },
      carousel_item_definition:{
        borderRadius: BorderRadius.md,
        borderColorSelected: Colors.PrimaryLight[7],
        borderColorNotSelected: Colors.PrimaryLight[2],
      },
      thumbnailSize: 80,
    },
    
  }

  console.log(images[mainImage])

  return (
    <View style={[ variantStyle[variant].container, containerStyle]}>
      <Image
        // source={typeof images[mainImage]?.image === 'string' ? { uri: images[mainImage]?.image } : images[mainImage]?.image}
        source={{ uri: images[mainImage] }}
        style={[ variantStyle[variant].mainImage ]}
        resizeMode="center"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[variantStyle[variant].carousel, scrollStyle]}
      >
        {/* immage render logic goes here,, configure first the layout */}
        {images.map((image,i)=>(
          <TouchableOpacity
            key={i}
            onPress={()=>setSelectedIndex(i)}
          >
            <Image
              source={typeof images[i] === 'string' ? { uri: images[i] } : images[i]}
              style={{
                width: variantStyle[variant].thumbnailSize,
                height: variantStyle[variant].thumbnailSize,
                borderRadius: variantStyle[variant].carousel_item_definition.borderRadius,
                borderWidth: BorderWidth.md,
                borderColor: i === imageIndex ? variantStyle[variant].carousel_item_definition.borderColorSelected : variantStyle[variant].carousel_item_definition.borderColorNotSelected,
                ...(i === imageIndex ? ShadowLight.xxl : {})
              }}
            />            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}



export default ImageCarousel


