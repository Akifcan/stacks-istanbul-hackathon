import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { BITCOIN_ORANGE } from '../../theme/colors';

const SpendingSkeleton: FC = () => {
    const skeletonItems = Array.from({ length: 6 }, (_, index) => (
        <View key={index} style={styles.listItem}>
            <View style={styles.listItemLeft}>
                <View style={styles.categoryIndicatorSkeleton} />
                <View>
                    <View style={styles.titleSkeleton} />
                    <View style={styles.dateSkeleton} />
                    <View style={styles.cardInfoSkeleton} />
                </View>
            </View>
            <View style={styles.amountSkeleton} />
        </View>
    ));

    return (
        <View style={styles.container}>
            {skeletonItems}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
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
    categoryIndicatorSkeleton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2a2a2a',
        marginRight: 12,
    },
    titleSkeleton: {
        width: 120,
        height: 16,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        marginBottom: 4,
    },
    dateSkeleton: {
        width: 80,
        height: 12,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        marginBottom: 2,
    },
    cardInfoSkeleton: {
        width: 140,
        height: 11,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
    },
    amountSkeleton: {
        width: 70,
        height: 16,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
    },
});

export default SpendingSkeleton;