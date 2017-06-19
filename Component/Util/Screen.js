import { Dimensions, Platform, PixelRatio } from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
    statusBarHeight: (Platform.OS === 'ios' ? 20 : 0)
}