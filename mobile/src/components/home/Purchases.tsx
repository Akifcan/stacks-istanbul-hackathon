import { FC } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TEXT_COLOR } from '../../theme/colors';
import PurchaseItem from '../purchases/PurchaseItem';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALLET_KEY } from '../../config/constants';
import { Invest } from '../../@types/wallet';

interface Purchase {
    id: string;
    amount: number;
    stxAmount: number;
    date: string;
    type: 'auto' | 'manual';
}

const Purchases: FC = () => {
    const { data: invests, isLoading } = useQuery<Invest[]>({
        queryKey: ['invests'],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<Invest[]>('/invests', {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    });

    // Transform API data to Purchase format
    const transformedData: Purchase[] = invests?.map(invest => ({
        id: invest.id.toString(),
        amount: invest.spent,
        stxAmount: invest.bougth,
        date: new Date(invest.createdAt).toISOString().split('T')[0], // Format to YYYY-MM-DD
        type: 'auto' as const
    })) || [];

    const renderPurchaseItem = ({ item }: { item: Purchase }) => (
        <PurchaseItem item={item} />
    );

    return (
        <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Purchases</Text>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading investments...</Text>
                </View>
            ) : (
                <FlatList
                    nestedScrollEnabled
                    data={transformedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPurchaseItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContent: {
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        fontFamily: 'IBMPlexMono-Bold'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        fontSize: 16,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    typeIndicator: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 12,
    },
    autoIndicator: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
    },
    manualIndicator: {
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
    },
    typeText: {
        fontSize: 10,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: TEXT_COLOR,
        marginBottom: 2,
        fontFamily: 'IBMPlexMono-Medium'
    },
    listItemDate: {
        fontSize: 12,
        color: '#666666',
        fontFamily: 'IBMPlexMono-Medium'
    },
    listItemAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default Purchases;