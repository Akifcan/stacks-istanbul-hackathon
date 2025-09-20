import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TEXT_COLOR, BITCOIN_ORANGE, BLACK } from '../../theme/colors';

interface SpendingItem {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
}

interface SpendingItemProps {
    item: SpendingItem;
}

const SpendingItem: FC<SpendingItemProps> = ({ item }) => {
    return (
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
};

const styles = StyleSheet.create({
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

export default SpendingItem;