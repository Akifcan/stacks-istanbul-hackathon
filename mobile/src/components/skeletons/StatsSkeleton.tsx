import { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const StatsSkeleton: FC = () => {
    return (
        <View style={styles.statsGrid}>
            <View style={styles.statCard}>
                <View style={styles.skeletonValue} />
                <View style={styles.skeletonLabel} />
            </View>
            <View style={styles.statCard}>
                <View style={styles.skeletonValue} />
                <View style={styles.skeletonLabel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    skeletonValue: {
        width: 50,
        height: 24,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonLabel: {
        width: 80,
        height: 12,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
    },
});

export default StatsSkeleton;