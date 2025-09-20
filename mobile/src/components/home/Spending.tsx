import { FC } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TEXT_COLOR } from '../../theme/colors';
import SpendingItem from '../spending/SpendingItem';

interface SpendingItemData {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
}

const Spending: FC = () => {
    // Mock data - will be replaced with real data later
    const recentSpending: SpendingItemData[] = [
        { id: '1', merchant: 'Starbucks', amount: 12.50, date: '2024-01-15', category: 'Food' },
        { id: '2', merchant: 'Uber', amount: 18.75, date: '2024-01-15', category: 'Transport' },
        { id: '3', merchant: 'Amazon', amount: 45.99, date: '2024-01-14', category: 'Shopping' },
        { id: '4', merchant: 'Netflix', amount: 15.99, date: '2024-01-14', category: 'Entertainment' },
        { id: '5', merchant: 'Target', amount: 67.43, date: '2024-01-13', category: 'Shopping' },
    ];

    const renderSpendingItem = ({ item }: { item: SpendingItemData }) => (
        <SpendingItem item={item} />
    );

    return (
        <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Credit Card Spending</Text>
            <FlatList
                data={recentSpending}
                keyExtractor={(item) => item.id}
                renderItem={renderSpendingItem}
                showsVerticalScrollIndicator={false}
            />
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
});

export default Spending;