import { FC } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TEXT_COLOR } from '../../theme/colors';
import SpendingItem from '../spending/SpendingItem';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALLET_KEY } from '../../config/constants';
import SpendingSkeleton from '../skeletons/SpendingSkeleton';

const Spending: FC = () => {
    const { data: transactions, isLoading } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<Transaction[]>('/transactions', {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    });

    // Transform API data to SpendingItemData format
    const transformedData: SpendingItemData[] = transactions?.map(transaction => ({
        id: transaction.id.toString(),
        merchant: transaction.merchantName,
        amount: parseFloat(transaction.amount),
        date: transaction.date,
        category: transaction.category
    })) || [];

    const renderSpendingItem = ({ item }: { item: SpendingItemData }) => (
        <SpendingItem item={item} />
    );

    return (
        <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Credit Card Spending</Text>
            {isLoading ? (
                <SpendingSkeleton />
            ) : (
                <FlatList
                    nestedScrollEnabled
                    data={transformedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSpendingItem}
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
});

export default Spending;