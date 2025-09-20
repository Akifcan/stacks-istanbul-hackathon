import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../theme/colors';

interface Purchase {
    id: string;
    amount: number;
    stxAmount: number;
    date: string;
    type: 'auto' | 'manual';
}

interface PurchaseItemProps {
    item: Purchase;
}

const PurchaseItem: FC<PurchaseItemProps> = ({ item }) => {
    return (
        <View style={styles.listItem}>
            <View style={styles.listItemLeft}>
                <View style={[styles.typeIndicator, item.type === 'auto' ? styles.autoIndicator : styles.manualIndicator]}>
                    <Text style={styles.typeText}>{item.type === 'auto' ? 'AUTO' : 'MANUAL'}</Text>
                </View>
                <View>
                    <Text style={styles.listItemTitle}>{item.stxAmount.toFixed(2)} STX</Text>
                    <Text style={styles.listItemDate}>{item.date}</Text>
                </View>
            </View>
            <Text style={styles.listItemAmount}>${item.amount.toFixed(2)}</Text>
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

export default PurchaseItem;