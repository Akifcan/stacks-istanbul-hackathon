import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BLACK, BLOOD_ORANGE, TEXT_COLOR } from "../theme/colors";
import SymbolIcon from '../../assets/icons/symbol.svg'
import Symbol2Icon from '../../assets/icons/symbol2.svg'
import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MNEMONIC_KEY, WALLET_KEY } from "../config/constants";

type Props = NativeStackScreenProps<RootStackParamList, 'CreateWallet'>;

const CreateWallet: FC<Props> = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)

    const handleCreateWallet = async () => {
        try {
            setLoading(true)
            const response = await api.get('/create-account')
            AsyncStorage.setItem(WALLET_KEY, response.data.address)
            AsyncStorage.setItem(MNEMONIC_KEY, response.data.mnemonic)
            navigation.replace('Mnemonic')
        } catch(e){
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>StackLit</Text>
                <View style={styles.placeholder} />
            </View>

            <SymbolIcon style={styles.icon} />
            <Symbol2Icon style={styles.icon2} />

            <View style={styles.content}>
                <Text style={styles.subtitle}>Start Building Wealth</Text>
                <Text style={styles.description}>
                    Connect your credit card and automatically invest your spare change when you hit spending limits. Turn everyday purchases into crypto investments.
                </Text>

                <View style={styles.centerContainer}>
                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.createNewButton}
                        onPress={handleCreateWallet}
                        activeOpacity={0.8}
                    >
                        <View style={styles.plusContainer}>
                            <Text style={styles.plusIcon}>+</Text>
                        </View>
                        <Text style={styles.createNewText}>{!isLoading ? 'Start Investing' : 'Creating...'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom: 15,
        left: -30,
        transform: [{rotate: '-10deg'}]
    },
    icon2: {
        position: 'absolute',
        right: 0,
        top: Dimensions.get('screen').height * .25
    },
    container: {
        flex: 1,
        backgroundColor: BLACK,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: TEXT_COLOR,
        fontWeight: '300',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: BLOOD_ORANGE,
        letterSpacing: 0.5,
        fontFamily: 'IBMPlexMono-Bold',
        backgroundColor: BLACK
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    subtitle: {
        fontSize: 28,
        fontWeight: '800',
        color: TEXT_COLOR,
        marginBottom: 8,
        letterSpacing: -0.5,
        fontFamily: 'IBMPlexMono-Bold',
        backgroundColor: BLACK
    },
    description: {
        fontSize: 16,
        color: TEXT_COLOR,
        marginBottom: 32,
        lineHeight: 22,
        fontWeight: '400',
        fontFamily: 'IBMPlexMono-Medium',
        backgroundColor: 'rgba(20, 20, 20, .8)'

    },
    centerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 32,
    },
    createNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        borderRadius: 20,
        padding: 24,
        borderWidth: 2,
        borderColor: BLOOD_ORANGE,
        borderStyle: 'dashed',
        justifyContent: 'center',
        width: '100%'
    },
    plusContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    plusIcon: {
        fontSize: 24,
        color: BLOOD_ORANGE,
        fontWeight: '300',
        fontFamily: 'IBMPlexMono-Medium'
    },
    createNewText: {
        fontSize: 18,
        fontWeight: '600',
        color: BLOOD_ORANGE,
        letterSpacing: 0.2,
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default CreateWallet