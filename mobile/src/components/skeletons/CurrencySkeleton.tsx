import { FC } from 'react';
import { View, StyleSheet } from 'react-native';

const CurrencySkeleton: FC = () => {
    return (
        <View style={styles.skeleton} />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        width: 80,
        height: 12,
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
    },
});

export default CurrencySkeleton;