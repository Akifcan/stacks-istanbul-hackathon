import { FC, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, BLOOD_ORANGE, TEXT_COLOR, BITCOIN_ORANGE } from '../theme/colors';
import { WALLET_KEY, MNEMONIC_KEY } from '../config/constants';
import { StackNavigation } from '../route';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>();
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [mnemonic, setMnemonic] = useState<string>('');
    const [showMnemonic, setShowMnemonic] = useState<boolean>(false);

    useEffect(() => {
        loadWalletData();
    }, []);

    const loadWalletData = async () => {
        try {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const mnemonicPhrase = await AsyncStorage.getItem(MNEMONIC_KEY);

            if (wallet) setWalletAddress(wallet);
            if (mnemonicPhrase) setMnemonic(mnemonicPhrase);
        } catch (error) {
            console.error('Error loading wallet data:', error);
        }
    };

    const handleRevealMnemonic = () => {
        if (!showMnemonic) {
            Alert.alert(
                "Security Warning",
                "Your recovery phrase is sensitive information. Make sure no one is watching your screen.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Show", onPress: () => setShowMnemonic(true) }
                ]
            );
        } else {
            setShowMnemonic(false);
        }
    };

    const handleCopyAddress = async () => {
        // In a real app, you'd use a clipboard library
        Alert.alert("Address Copied", "Wallet address has been copied to clipboard");
    };

    const handleCopyMnemonic = async () => {
        if (showMnemonic) {
            // In a real app, you'd use a clipboard library
            Alert.alert("Recovery Phrase Copied", "Recovery phrase has been copied to clipboard");
        }
    };

    const formatMnemonic = (phrase: string) => {
        const words = phrase.split(' ');
        const pairs = [];
        for (let i = 0; i < words.length; i += 2) {
            pairs.push(words.slice(i, i + 2));
        }
        return pairs;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Wallet Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Wallet Information</Text>

                    {/* Wallet Address */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Wallet Address</Text>
                            <TouchableOpacity
                                style={styles.copyButton}
                                onPress={handleCopyAddress}
                            >
                                <Text style={styles.copyButtonText}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.addressText}>{walletAddress || 'No wallet found'}</Text>
                    </View>

                    {/* Recovery Phrase */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Recovery Phrase</Text>
                            <View style={styles.buttonGroup}>
                                {showMnemonic && (
                                    <TouchableOpacity
                                        style={styles.copyButton}
                                        onPress={handleCopyMnemonic}
                                    >
                                        <Text style={styles.copyButtonText}>Copy</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={[styles.revealButton, showMnemonic && styles.hideButton]}
                                    onPress={handleRevealMnemonic}
                                >
                                    <Text style={styles.revealButtonText}>
                                        {showMnemonic ? 'Hide' : 'Reveal'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {showMnemonic ? (
                            <View style={styles.mnemonicContainer}>
                                {formatMnemonic(mnemonic).map((pair, index) => (
                                    <View key={index} style={styles.mnemonicRow}>
                                        {pair.map((word, wordIndex) => (
                                            <View key={wordIndex} style={styles.mnemonicWord}>
                                                <Text style={styles.mnemonicNumber}>
                                                    {index * 2 + wordIndex + 1}
                                                </Text>
                                                <Text style={styles.mnemonicText}>{word}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.hiddenMnemonic}>
                                <Text style={styles.hiddenText}>••• ••• ••• ••• ••• •••</Text>
                                <Text style={styles.hiddenSubtext}>
                                    Tap "Reveal" to show your recovery phrase
                                </Text>
                            </View>
                        )}
                    </View>
                </View>


                {/* App Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Information</Text>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Version</Text>
                        <Text style={styles.infoValue}>1.0.0</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Build</Text>
                        <Text style={styles.infoValue}>1.0.0 (1)</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        fontFamily: 'IBMPlexMono-Bold'
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Bold'
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    copyButton: {
        backgroundColor: BITCOIN_ORANGE,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    copyButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Medium'
    },
    revealButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    hideButton: {
        backgroundColor: '#666666',
    },
    revealButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Medium'
    },
    addressText: {
        fontSize: 14,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium',
        lineHeight: 20,
    },
    mnemonicContainer: {
        marginTop: 8,
    },
    mnemonicRow: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 12,
    },
    mnemonicWord: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    mnemonicNumber: {
        fontSize: 12,
        color: BITCOIN_ORANGE,
        fontWeight: '600',
        fontFamily: 'IBMPlexMono-Medium',
        minWidth: 20,
    },
    mnemonicText: {
        fontSize: 14,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium',
        flex: 1,
    },
    hiddenMnemonic: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    hiddenText: {
        fontSize: 18,
        color: '#666666',
        marginBottom: 8,
        letterSpacing: 2,
    },
    hiddenSubtext: {
        fontSize: 12,
        color: '#888888',
        fontFamily: 'IBMPlexMono-Medium'
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    infoLabel: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    infoValue: {
        fontSize: 16,
        color: '#888888',
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default Settings;