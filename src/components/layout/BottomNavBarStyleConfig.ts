import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Colors, Spacing, BorderWidth, BorderRadius } from '../../constants'

export const BottomNavBarStyleConfig : BottomTabNavigationOptions = {
    tabBarIconStyle: {
        borderWidth: BorderWidth.xs,
        borderColor: Colors.PrimaryLight[5],
        backgroundColor: Colors.PrimaryLight[8],
        aspectRatio: 1/1,
        height: 50,
        padding: Spacing.xs,
        borderRadius: BorderRadius.lg,
        
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    },
    tabBarActiveTintColor: Colors.PrimaryLight[2],
    tabBarInactiveTintColor: Colors.PrimaryLight[3],
    headerShown: false,
    tabBarShowLabel: false,
}