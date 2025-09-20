import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackNavigation } from "../route";
import { BLACK, BLOOD_ORANGE, TEXT_COLOR, BITCOIN_ORANGE } from "../theme/colors";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WALLET_KEY } from "../config/constants";

type Props = NativeStackScreenProps<RootStackParamList, 'SaveCreditCard'>;

const SaveCreditCard: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>()
    const [cardNumber, setCardNumber] = useState('5526080000000002');
    const [expiryDate, setExpiryDate] = useState('10/27');
    const [cvv, setCvv] = useState('020');
    const [cardholderName, setCardholderName] = useState('AKİFCAN KARA');
    const [spendingLimit, setSpendingLimit] = useState('500');
    const [investmentAmount, setInvestmentAmount] = useState('2');
    const [selectedCrypto, setSelectedCrypto] = useState<'STX' | 'BTC'>('STX');

    const handleCardNumberChange = (text: string) => {
        const cleaned = text.replace(/\s/g, '');
        const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(formatted);
    };

    const handleExpiryChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            const formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
            setExpiryDate(formatted);
        } else {
            setExpiryDate(cleaned);
        }
    };

    const saveCardMutation = useMutation({
        mutationFn: async (cardData: any) => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.post('/save-card', cardData, {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
        onSuccess: () => {
            Alert.alert("Success", "Credit card saved successfully!");
            navigation.navigate('Home');
        },
        onError: (error) => {
            Alert.alert("Error", "Failed to save credit card. Please try again.");
            console.error('Save card error:', error);
        }
    });

    const handleSaveCard = () => {
        if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
            Alert.alert("Error", "Please fill in all card details");
            return;
        }

        const [month, year] = expiryDate.split('/');
        const cleanCardNumber = cardNumber.replace(/\s/g, '');

        const cardData = {
            cardNumber: cleanCardNumber,
            cardholderName: cardholderName,
            expiryMonth: month,
            expiryYear: year,
            cvv: cvv,
            minOrderLimit: parseInt(spendingLimit),
            buyAmount: parseInt(investmentAmount)
        };

        saveCardMutation.mutate(cardData);
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
                <Text style={styles.title}>Add Credit Card</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Card Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Card Information</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Card Number</Text>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            placeholderTextColor="#666666"
                            keyboardType="numeric"
                            maxLength={19}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.inputLabel}>Expiry Date</Text>
                            <TextInput
                                style={styles.input}
                                value={expiryDate}
                                onChangeText={handleExpiryChange}
                                placeholder="MM/YY"
                                placeholderTextColor="#666666"
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </View>

                        <View style={[styles.inputContainer, styles.halfWidth]}>
                            <Text style={styles.inputLabel}>CVV</Text>
                            <TextInput
                                style={styles.input}
                                value={cvv}
                                onChangeText={setCvv}
                                placeholder="123"
                                placeholderTextColor="#666666"
                                keyboardType="numeric"
                                maxLength={3}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Cardholder Name</Text>
                        <TextInput
                            style={styles.input}
                            value={cardholderName}
                            onChangeText={setCardholderName}
                            placeholder="John Doe"
                            placeholderTextColor="#666666"
                            autoCapitalize="words"
                        />
                    </View>
                </View>

                {/* Auto-Investment Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Auto-Investment Settings</Text>
                    <Text style={styles.sectionDescription}>
                        Set spending limits to automatically invest in crypto when reached
                    </Text>

                    <View style={styles.settingsCard}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Spending Limit ($)</Text>
                            <TextInput
                                style={styles.input}
                                value={spendingLimit}
                                onChangeText={setSpendingLimit}
                                placeholder="100"
                                placeholderTextColor="#666666"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Investment Amount ($)</Text>
                            <TextInput
                                style={styles.input}
                                value={investmentAmount}
                                onChangeText={setInvestmentAmount}
                                placeholder="5"
                                placeholderTextColor="#666666"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Choose Cryptocurrency</Text>
                            <View style={styles.cryptoSelector}>
                                <TouchableOpacity
                                    style={[
                                        styles.cryptoButton,
                                        selectedCrypto === 'STX' && styles.cryptoButtonActive
                                    ]}
                                    onPress={() => setSelectedCrypto('STX')}
                                >
                                    <Text style={[
                                        styles.cryptoButtonText,
                                        selectedCrypto === 'STX' && styles.cryptoButtonTextActive
                                    ]}>STX</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.cryptoButton,
                                        selectedCrypto === 'BTC' && styles.cryptoButtonActive
                                    ]}
                                    onPress={() => setSelectedCrypto('BTC')}
                                >
                                    <Text style={[
                                        styles.cryptoButtonText,
                                        selectedCrypto === 'BTC' && styles.cryptoButtonTextActive
                                    ]}>BTC</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Preview */}
                    <View style={styles.previewCard}>
                        <Text style={styles.previewTitle}>Investment Preview</Text>
                        <Text style={styles.previewText}>
                            When you spend ${spendingLimit}, we'll automatically invest ${investmentAmount} in {selectedCrypto}
                        </Text>
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity
                        style={[styles.saveButton, saveCardMutation.isPending && { opacity: 0.7 }]}
                        onPress={handleSaveCard}
                        disabled={saveCardMutation.isPending}
                    >
                        <Text style={styles.saveButtonText}>
                            {saveCardMutation.isPending ? 'Saving...' : 'Save Card & Settings'}
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
    section: {
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Bold'
    },
    sectionDescription: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 20,
        lineHeight: 20,
        fontFamily: 'IBMPlexMono-Medium'
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: TEXT_COLOR,
        marginBottom: 8,
        fontWeight: '600',
        fontFamily: 'IBMPlexMono-Medium'
    },
    input: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: TEXT_COLOR,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        fontFamily: 'IBMPlexMono-Medium'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    settingsCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cryptoSelector: {
        flexDirection: 'row',
        gap: 12,
    },
    cryptoButton: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3a3a3a',
    },
    cryptoButtonActive: {
        backgroundColor: BITCOIN_ORANGE,
        borderColor: BITCOIN_ORANGE,
    },
    cryptoButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    cryptoButtonTextActive: {
        color: BLACK,
    },
    previewCard: {
        backgroundColor: 'rgba(255, 87, 34, 0.1)',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 87, 34, 0.3)',
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: BLOOD_ORANGE,
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Bold'
    },
    previewText: {
        fontSize: 14,
        color: TEXT_COLOR,
        lineHeight: 20,
        fontFamily: 'IBMPlexMono-Medium'
    },
    actionsSection: {
        paddingTop: 20,
        paddingBottom: 32,
    },
    saveButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Bold'
    },
});

export default SaveCreditCard;