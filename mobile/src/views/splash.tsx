import { FC, useEffect, useRef } from "react"
import { StyleSheet, Text, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BLACK } from "../theme/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MNEMONIC_KEY, MNEMONIC_REVEAL_KEY, WALLET_KEY } from "../config/constants"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import api from "../config/api"
import LottieView from 'lottie-react-native'
import Sbtc2 from '../../assets/icons/sbtc2.svg'

const styles = StyleSheet.create({
    container: {
        backgroundColor: BLACK,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'IBMPlexMono-Medium',
        color: 'white',
        fontSize: 30
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash:FC<Props> = ({navigation}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const iconPositionAnim = useRef(new Animated.Value(100)).current;
    const iconFadeAnim = useRef(new Animated.Value(0)).current;

    const handleRedirect = async () => {


        const currentWallet = await AsyncStorage.getItem(WALLET_KEY)

        if(!currentWallet){
            return navigation.replace('Greet')
        }

        const mnemoicReveal = await AsyncStorage.getItem(MNEMONIC_REVEAL_KEY)

        if(!mnemoicReveal) {
            return navigation.replace('Mnemonic')
        }

        api.defaults.headers['wallet'] = currentWallet
        console.log(currentWallet)

        const savedCards = await api.get<CardProps[]>('/saved-cards')

        if(!savedCards.data.length){
            return navigation.replace('SaveCreditCard')
        }

        return navigation.replace('Home')
    }


    useEffect(() => {
        // Start animation when component mounts
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(iconPositionAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(iconFadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            handleRedirect()
        }, 1000)
    }, [])

    return <SafeAreaView style={[styles.container]}>
        <LottieView 
            source={require('../../assets/lottie/splash2.json')} 
            style={{width: 400, height: 400, backgroundColor: BLACK}} 
            autoPlay loop 
        />
        <Animated.View
            style={[
                styles.icon,
                {
                    opacity: iconFadeAnim,
                    transform: [
                        {
                            translateX: iconPositionAnim
                        }
                    ]
                }
            ]}
        >
            <Sbtc2 />
        </Animated.View>
        <Animated.Text
            style={[
                styles.text,
                {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                }
            ]}
        >
            StackLit
        </Animated.Text>
    </SafeAreaView>
}

export default Splash