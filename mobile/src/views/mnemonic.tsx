import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BLACK, BLOOD_ORANGE, TEXT_COLOR, BITCOIN_ORANGE } from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MNEMONIC_KEY, MNEMONIC_REVEAL_KEY } from "../config/constants";

type Props = NativeStackScreenProps<RootStackParamList, 'Mnemonic'>;

const Mnemonic: FC<Props> = ({navigation}) => {
    const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
    const [isRevealed, setIsRevealed] = useState(false);

    const handleMnemoic = async () => {
        const key = await AsyncStorage.getItem(MNEMONIC_KEY)

        if(!key){
            return navigation.replace('CreateWallet')
        }

        const words = key.split(' ')
        setMnemonicWords(words);
    }

    useEffect(() => {
        handleMnemoic()
    }, []);

    const handleRevealPhrase = () => {
        setIsRevealed(true);
    };

    const handleCopyPhrase = () => {
        // In a real app, you'd copy to clipboard
        Alert.alert("Copied", "Recovery phrase copied to clipboard");
    };

    const handleContinue = () => {
        if (!isRevealed) {
            Alert.alert("Security Warning", "Please reveal and save your recovery phrase first");
            return;
        }
        AsyncStorage.setItem(MNEMONIC_REVEAL_KEY, 'true')
        navigation.replace('SaveCreditCard');
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
                <Text style={styles.title}>Seed Phrase</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Warning Section */}
                <View style={styles.warningSection}>
                    <View style={styles.warningIcon}>
                        <Text style={styles.warningEmoji}>⚠️</Text>
                    </View>
                    <Text style={styles.warningTitle}>Keep Your Seed Phrase Safe</Text>
                    <Text style={styles.warningText}>
                        This 12-word recovery phrase is the master key to your wallet. Anyone with this phrase can access your funds. Store it securely offline.
                    </Text>
                </View>

                {/* Mnemonic Display */}
                <View style={styles.mnemonicSection}>
                    <Text style={styles.sectionTitle}>Your Recovery Phrase</Text>

                    {!isRevealed ? (
                        <View style={styles.hiddenPhrase}>
                            <Text style={styles.hiddenText}>Tap to reveal your seed phrase</Text>
                            <TouchableOpacity
                                style={styles.revealButton}
                                onPress={handleRevealPhrase}
                            >
                                <Text style={styles.revealButtonText}>👁️ Reveal Phrase</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.mnemonicGrid}>
                            {mnemonicWords.map((word, index) => (
                                <View key={index} style={styles.wordCard}>
                                    <Text style={styles.wordNumber}>{index + 1}</Text>
                                    <Text style={styles.wordText}>{word}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Security Tips */}
                <View style={styles.tipsSection}>
                    <Text style={styles.tipsTitle}>Security Tips</Text>
                    <View style={styles.tipsList}>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>✅</Text>
                            <Text style={styles.tipText}>Write it down on paper</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>✅</Text>
                            <Text style={styles.tipText}>Store in a safe place</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>❌</Text>
                            <Text style={styles.tipText}>Never share with anyone</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>❌</Text>
                            <Text style={styles.tipText}>Don't store digitally</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
                    {isRevealed && (
                        <TouchableOpacity
                            style={styles.copyButton}
                            onPress={handleCopyPhrase}
                        >
                            <Text style={styles.copyButtonText}>📋 Copy to Clipboard</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.continueButton, !isRevealed && styles.disabledButton]}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.continueButtonText, !isRevealed && styles.disabledButtonText]}>
                            I've Saved My Phrase
                        </Text>
                    </TouchableOpacity>
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
    warningSection: {
        backgroundColor: 'rgba(255, 87, 34, 0.1)',
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 87, 34, 0.3)',
        alignItems: 'center',
    },
    warningIcon: {
        marginBottom: 12,
    },
    warningEmoji: {
        fontSize: 32,
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 8,
        textAlign: 'center',
        fontFamily: 'IBMPlexMono-Bold'
    },
    warningText: {
        fontSize: 14,
        color: TEXT_COLOR,
        textAlign: 'center',
        lineHeight: 20,
        fontFamily: 'IBMPlexMono-Medium'
    },
    mnemonicSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Bold'
    },
    hiddenPhrase: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2a2a2a',
        borderStyle: 'dashed',
    },
    hiddenText: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'IBMPlexMono-Medium'
    },
    revealButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    revealButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Medium'
    },
    mnemonicGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    wordCard: {
        width: '48%',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    wordNumber: {
        fontSize: 12,
        color: BITCOIN_ORANGE,
        fontWeight: '600',
        marginRight: 12,
        minWidth: 20,
        fontFamily: 'IBMPlexMono-Medium'
    },
    wordText: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontWeight: '500',
        flex: 1,
        fontFamily: 'IBMPlexMono-Medium'
    },
    tipsSection: {
        marginBottom: 32,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Bold'
    },
    tipsList: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipIcon: {
        fontSize: 16,
        marginRight: 12,
        minWidth: 24,
    },
    tipText: {
        fontSize: 14,
        color: TEXT_COLOR,
        flex: 1,
        fontFamily: 'IBMPlexMono-Medium'
    },
    actionsSection: {
        paddingBottom: 32,
    },
    copyButton: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: BITCOIN_ORANGE,
    },
    copyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: BITCOIN_ORANGE,
        fontFamily: 'IBMPlexMono-Medium'
    },
    continueButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Bold'
    },
    disabledButton: {
        backgroundColor: '#333333',
    },
    disabledButtonText: {
        color: '#666666',
    },
});

export default Mnemonic;