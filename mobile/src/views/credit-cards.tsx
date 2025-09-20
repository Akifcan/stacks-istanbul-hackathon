import { FC } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLACK, BLOOD_ORANGE, TEXT_COLOR, BITCOIN_ORANGE } from '../theme/colors';
import { WALLET_KEY } from '../config/constants';
import api from '../config/api';
import { StackNavigation } from '../route';

type Props = NativeStackScreenProps<RootStackParamList, 'CreditCards'>;

const CreditCards: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>();

    const { data: cards, isLoading } = useQuery<CardProps[]>({
        queryKey: ['saved-cards'],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<CardProps[]>('/saved-cards', {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    });

    const renderCard = ({ item }: { item: CardProps }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('CardDetails', { cardId: item.cardId, starsWith: item.startsWith })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.cardNumberContainer}>
                    <Text style={styles.cardNumber}>**** **** **** {item.startsWith}</Text>
                    <Text style={styles.cardId}>ID: {item.cardId}</Text>
                </View>
            </View>

            <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Spend Amount</Text>
                    <Text style={styles.detailValue}>${item.spendAmount}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Order Limit</Text>
                    <Text style={styles.detailValue}>${item.orderLimit}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Buy Amount</Text>
                    <Text style={styles.detailValue}>${item.buyAmount}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Created</Text>
                    <Text style={styles.detailValue}>
                        {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>
                    Progress: ${item.spendAmount} / ${item.orderLimit}
                </Text>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${Math.min((item.spendAmount / item.orderLimit) * 100, 100)}%` }
                        ]}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );

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
                <Text style={styles.title}>Credit Cards</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('SaveCreditCard')}
                >
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading cards...</Text>
                    </View>
                ) : !cards || cards.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>No Cards Found</Text>
                        <Text style={styles.emptySubtitle}>
                            You haven't added any credit cards yet.
                        </Text>
                        <TouchableOpacity
                            style={styles.addCardButton}
                            onPress={() => navigation.navigate('SaveCreditCard')}
                        >
                            <Text style={styles.addCardButtonText}>Add Your First Card</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={cards}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCard}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
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
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: BLOOD_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        fontSize: 24,
        color: BLACK,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 12,
        fontFamily: 'IBMPlexMono-Bold'
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
        fontFamily: 'IBMPlexMono-Medium'
    },
    addCardButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 16,
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    addCardButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: BLACK,
        fontFamily: 'IBMPlexMono-Bold'
    },
    listContainer: {
        paddingTop: 20,
        paddingBottom: 32,
    },
    cardContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    cardNumberContainer: {
        flex: 1,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 4,
        fontFamily: 'IBMPlexMono-Bold'
    },
    cardId: {
        fontSize: 12,
        color: '#888888',
        fontFamily: 'IBMPlexMono-Medium'
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    activeBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
    },
    inactiveBadge: {
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    cardDetails: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: '#888888',
        fontFamily: 'IBMPlexMono-Medium'
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    progressContainer: {
        marginTop: 4,
    },
    progressLabel: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium'
    },
    progressBar: {
        height: 6,
        backgroundColor: '#2a2a2a',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: BITCOIN_ORANGE,
        borderRadius: 3,
    },
});

export default CreditCards;