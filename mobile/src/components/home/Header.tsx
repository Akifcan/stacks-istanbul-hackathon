import { FC } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../route';
import Symbol4 from '../../../assets/icons/symbol4.svg';
import Wallet from '../../../assets/icons/wallet.svg';
import Settings from '../../../assets/icons/settings.svg';
import api from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WALLET_KEY } from '../../config/constants';

const Header: FC = () => {
    const navigation = useNavigation<StackNavigation>();

    const handleMock = async () => {
        try {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<CardProps[]>('/saved-cards', {
                headers: {
                    'wallet': wallet
                }
            });
            console.log(wallet)
            const cards = response.data;
            if (cards && cards.length > 0) {
                // Rastgele bir kart seç
                const randomIndex = Math.floor(Math.random() * cards.length);
                const selectedCard = cards[randomIndex];

                // Mock spend API'sini çağır
                await api.post("/mock-spend", { cardId: selectedCard.cardId });
                console.log('Mock spend executed for card:', selectedCard.cardId);
            }
        } catch (error) {
            console.error('Mock spend error:', error);
        }
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerLeft} onPress={handleMock}>
                <View style={styles.avatar}>
                    <Symbol4 width={40} height={40} />
                </View>
                <Text style={styles.welcomeText}>Account</Text>
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.navigate('CreditCards')}
                >
                    <Text style={styles.headerButtonText}><Wallet width={30} height={30} /></Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={styles.headerButtonText}><Settings width={17} height={17} /></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButtonText: {
        fontSize: 16,
    },
});

export default Header;