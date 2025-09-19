import { FC } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TEXT_COLOR, BITCOIN_ORANGE, BLACK } from '../../theme/colors';

interface SpendingItem {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
}

const Spending: FC = () => {
    // Mock data - will be replaced with real data later
    const recentSpending: SpendingItem[] = [
        { id: '1', merchant: 'Starbucks', amount: 12.50, date: '2024-01-15', category: 'Food' },
        { id: '2', merchant: 'Uber', amount: 18.75, date: '2024-01-15', category: 'Transport' },
        { id: '3', merchant: 'Amazon', amount: 45.99, date: '2024-01-14', category: 'Shopping' },
        { id: '4', merchant: 'Netflix', amount: 15.99, date: '2024-01-14', category: 'Entertainment' },
        { id: '5', merchant: 'Target', amount: 67.43, date: '2024-01-13', category: 'Shopping' },
    ];

    const renderSpendingItem = ({ item }: { item: SpendingItem }) => (
        <View style={styles.listItem}>
            <View style={styles.listItemLeft}>
                <View style={[styles.categoryIndicator]}>
                    <Text style={styles.categoryText}>{item.category.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={styles.listItemTitle}>{item.merchant}</Text>
                    <Text style={styles.listItemDate}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.listItemAmount}>-${item.amount.toFixed(2)}</Text>
        </View>
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
    categoryIndicator: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: BITCOIN_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: BLACK,
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

export default Spending;