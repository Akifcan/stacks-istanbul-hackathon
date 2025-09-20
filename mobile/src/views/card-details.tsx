import { FC } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, BLOOD_ORANGE, TEXT_COLOR } from '../theme/colors';
import { WALLET_KEY } from '../config/constants';
import { StackNavigation } from '../route';
import StxIcon from '../../assets/icons/stacks.svg'
import Symbol6 from '../../assets/icons/symbol6.svg'

type Props = NativeStackScreenProps<RootStackParamList, 'CardDetails'>;

const CardDetails: FC<Props> = ({ route }) => {
    const navigation = useNavigation<StackNavigation>();
    const { cardId } = route.params;

    const { data: investData, isLoading } = useQuery<CardInvestData>({
        queryKey: ['card-invests', cardId],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<CardInvestData>(`/invests/${cardId}`, {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    });

    console.log(investData)

    const renderInvestmentItems = () => {
        if (!investData?.value) return null;

        return investData.value.map((item, index) => {
            if (item.type === 'some' && item.value?.value) {
                const data = item.value.value;
                const investment = {
                    amount: parseInt(data.amount.value),
                    currentValue: parseInt(data.currentValue.value),
                    spend: parseInt(data.spend.value)
                };

                return (
                    <View key={index}>
                        <Text style={styles.investmentHeader}>Investment #{index + 1}</Text>

                        {/* Total Spent */}
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>Total Spent</Text>
                            <Text style={styles.statValue}>${investment.spend}</Text>
                            <Text style={styles.statSubtext}>Amount invested through this card</Text>
                        </View>

                        {/* STX Purchased */}
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>STX Purchased</Text>
                            <Text style={styles.statValue}>{investment.amount} STX <StxIcon width={30} height={30} /></Text>
                            <Text style={styles.statSubtext}>Total STX tokens acquired</Text>
                            <Symbol6 style={styles.icon} width={120} height={120} />
                        </View>

                        {/* Current Value */}
                        <View style={styles.statCard}>
                            <Text style={styles.statLabel}>Current Value</Text>
                            <Text style={styles.statValue}>${investment.currentValue}</Text>
                            <Text style={styles.statSubtext}>Current USD value of holdings</Text>
                        </View>
                    </View>
                );
            }
            return null;
        });
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
                <Text style={styles.title}>Card Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Card Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Card Information</Text>
                    <View style={styles.cardInfoContainer}>
                        <Text style={styles.cardInfoLabel}>Card Ends With</Text>
                        <Text style={styles.cardInfoValue}>**** {route.params.starsWith}</Text>
                        <Text style={styles.cardInfoDescription}>
                            This is the card used for automatic STX purchases
                        </Text>
                    </View>
                </View>

                {/* Investment Overview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Investment Overview</Text>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading investment data...</Text>
                        </View>
                    ) : investData?.value && investData.value.length > 0 ? (
                        renderInvestmentItems()
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No investment data available</Text>
                            <Text style={styles.noDataSubtext}>This card hasn't been used for any investments yet</Text>
                        </View>
                    )}
                </View>

                {/* Cancel Transaction Button */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel Auto Purchase</Text>
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
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Bold'
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cardIdText: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium',
        textAlign: 'center',
    },
    cardInfoContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        alignItems: 'center',
    },
    cardInfoLabel: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium'
    },
    cardInfoValue: {
        fontSize: 24,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Bold',
        letterSpacing: 2,
    },
    cardInfoDescription: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        fontFamily: 'IBMPlexMono-Medium'
    },
    cancelButton: {
        backgroundColor: '#d32f2f',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f44336',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        fontFamily: 'IBMPlexMono-Medium'
    },
    loadingContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    loadingText: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    statCard: {
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        justifyContent: 'center',
    },
    profitCard: {
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
    },
    lossCard: {
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.05)',
    },
    statLabel: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium'
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 4,
        fontFamily: 'IBMPlexMono-Bold',
        alignItems: 'center',
    },
    statSubtext: {
        fontSize: 12,
        color: '#666666',
        fontFamily: 'IBMPlexMono-Medium'
    },
    profitText: {
        color: '#4caf50',
    },
    lossText: {
        color: '#f44336',
    },
    metricsCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    metricsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_COLOR,
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Medium'
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    metricLabel: {
        fontSize: 14,
        color: '#888888',
        fontFamily: 'IBMPlexMono-Medium'
    },
    metricValue: {
        fontSize: 14,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    noDataContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    noDataText: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_COLOR,
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium',
        textAlign: 'center',
    },
    noDataSubtext: {
        fontSize: 14,
        color: '#666666',
        fontFamily: 'IBMPlexMono-Medium',
        textAlign: 'center',
    },
    investmentHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        marginTop: 8,
        fontFamily: 'IBMPlexMono-Bold',
        textAlign: 'center',
    },
    icon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        transform: [{rotate: '20deg'}]
    }
});

export default CardDetails;