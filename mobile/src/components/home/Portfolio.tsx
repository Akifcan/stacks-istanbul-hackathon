import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BLOOD_ORANGE, TEXT_COLOR } from '../../theme/colors';
import Stacks from '../../../assets/icons/stacks.svg';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALLET_KEY } from '../../config/constants';

const Portfolio: FC = () => {
    const { data: walletData, isLoading } = useQuery<WalletProps>({
        queryKey: ['wallet-balance'],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<WalletProps>('/my-wallet', {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    });



    return (
        <View style={styles.portfolioSection}>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>STX Balance</Text>
                <Text style={styles.balanceAmount}>
                    {isLoading ? 'Loading...' : walletData?.balance || '0'} <Stacks width={30} height={30} />
                </Text>
                <Text style={styles.balanceValue}>
                    {isLoading ? 'Loading...' : walletData?.usd || '$0.00'} USD
                </Text>
                <Text style={styles.priceInfo}>1 STX = $0.85</Text>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>$30</Text>
                    <Text style={styles.statLabel}>Total Invested</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>5</Text>
                    <Text style={styles.statLabel}>Auto Purchases</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    portfolioSection: {
        paddingTop: 20,
    },
    balanceCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    balanceLabel: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium'
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 4,
        fontFamily: 'IBMPlexMono-Bold'
    },
    balanceValue: {
        fontSize: 20,
        fontWeight: '600',
        color: BLOOD_ORANGE,
        marginBottom: 8,
        fontFamily: 'IBMPlexMono-Medium'
    },
    priceInfo: {
        fontSize: 12,
        color: '#666666',
        fontFamily: 'IBMPlexMono-Medium'
    },
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
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 4,
        fontFamily: 'IBMPlexMono-Bold'
    },
    statLabel: {
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default Portfolio;