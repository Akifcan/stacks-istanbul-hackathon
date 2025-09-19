import { FC, useEffect } from "react"
import { StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BLACK } from "../theme/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { WALLET_KEY } from "../config/constants"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import api from "../config/api"

const styles = StyleSheet.create({
    container: {
        backgroundColor: BLACK,
        flex: 1
    }
})

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash:FC<Props> = ({navigation}) => {

    const handleRedirect = async () => {
        const currentWallet = await AsyncStorage.getItem(WALLET_KEY)

        if(!currentWallet){
            return navigation.replace('Greet')
        }

        api.defaults.headers['wallet'] = currentWallet
        return navigation.replace('Home')
    }


    useEffect(() => {
        handleRedirect()
    }, [])

    return <SafeAreaView style={[styles.container]}>
    </SafeAreaView>
}

export default Splash