import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackNavigation } from "../route";
import SbtcIcon from '../../assets/icons/sbtc.svg'
import StacksIcon from '../../assets/icons/stacks.svg'
import { BITCOIN_ORANGE, BLACK, TEXT_COLOR } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, 'Greet'>;

const { width, height } = Dimensions.get('window');

const Greet: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>()

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animateSequence = () => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1100,
                    useNativeDriver: true,
                }),
            ]).start();

            // Floating animation for crypto elements
            Animated.loop(
                Animated.sequence([
                    Animated.timing(rotateAnim, {
                        toValue: 1,
                        duration: 8000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotateAnim, {
                        toValue: 0,
                        duration: 8000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Pulse animation for the accent elements
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateSequence();
    }, []);


    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Floating Background Elements */}
            <View style={styles.backgroundElements}>
                <Animated.View
                    style={[
                        styles.floatingElement,
                        styles.bitcoinElement,
                        {
                            transform: [
                                { rotate: rotateInterpolate },
                                { scale: scaleAnim },
                            ],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Text style={styles.bitcoinIcon}>₿</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingElement,
                        styles.stxElement,
                        {
                            transform: [
                                { rotate: rotateInterpolate },
                                { scale: pulseAnim },
                            ],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <StacksIcon width={50} height={50} />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.floatingElement,
                        styles.accentElement,
                        {
                            transform: [{ scale: pulseAnim }],
                            opacity: fadeAnim,
                        },
                    ]}
                />
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Header */}
                <Animated.View
                    style={[
                        styles.header,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.logoContainer}>

                        <Animated.View
                            style={[
                                {
                                    transform: [{ scale: pulseAnim }],
                                },
                            ]}
                        >
                            <SbtcIcon width={70} height={70} />
                        </Animated.View>
                        <Text style={styles.logo}>STACKLIT</Text>
                    </View>
                </Animated.View>

                {/* Hero Section */}
                <Animated.View
                    style={[
                        styles.heroSection,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.heroTitle}>
                        EVERY PURCHASE
                        <Text style={styles.heroAccent}>₿</Text>
                        {'\n'}
                        <Text style={styles.heroAccentText}>BUILDS WEALTH</Text>
                    </Text>

                    <Text style={styles.heroDescription}>
                        Turn your everyday spending into crypto investments. Connect your cards and automatically invest in STX & Bitcoin when you hit spending limits.
                    </Text>
                </Animated.View>

                {/* Action Buttons */}
                <Animated.View
                    style={[
                        styles.actionsContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('CreateWallet')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK,
    },
    backgroundElements: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    floatingElement: {
        position: 'absolute',
        borderRadius: 50,
    },
    bitcoinElement: {
        top: height * 0.15,
        right: width * 0.1,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255, 159, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: BITCOIN_ORANGE,
    },
    bitcoinIcon: {
        fontSize: 40,
        color: '#FF9F00',
    },
    stxElement: {
        top: height * 0.25,
        left: width * 0.05,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(255, 107, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 0, 0.3)',
    },
    stxIcon: {
        fontSize: 32,
    },
    accentElement: {
        top: height * 0.35,
        right: width * 0.2,
        width: 24,
        height: 24,
        backgroundColor: '#FF5722',
        borderRadius: 12,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        gap: 10
    },
    logoAccent: {
        width: 12,
        height: 12,
        backgroundColor: '#FF5722',
        borderRadius: 6,
        marginRight: 8,
    },
    logo: {
        fontSize: 28,
        fontWeight: '900',
        color: TEXT_COLOR,
        letterSpacing: 2,
        fontFamily: 'IBMPlexMono-Medium'
    },
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-SemiBold',
        textAlign: 'center',
        lineHeight: 52,
        marginBottom: 32,
        letterSpacing: -1,
    },
    heroAccent: {
        color: '#FF9F00',
        fontSize: 48,
    },
    heroAccentText: {
        color: '#FF5722',
        fontSize: 48,
        fontWeight: '900',
    },
    heroDescription: {
        fontSize: 16,
        color: TEXT_COLOR,
        textAlign: 'center',
        lineHeight: 24,
        marginHorizontal: 20,
        fontWeight: '400',
        fontFamily: 'IBMPlexMono-Medium'
    },
    actionsContainer: {
        gap: 16,
        paddingHorizontal: 20,
    },
    primaryButton: {
        backgroundColor: '#333333',
        borderRadius: 25,
        paddingVertical: 18,
        paddingHorizontal: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
        letterSpacing: 0.5,
        fontFamily: 'IBMPlexMono-Medium'
    },
    secondaryButton: {
        borderRadius: 25,
        paddingVertical: 18,
        paddingHorizontal: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'transparent',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#CCCCCC',
        letterSpacing: 0.3,
    },
});

export default Greet