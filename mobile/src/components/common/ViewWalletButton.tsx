import { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLOOD_ORANGE } from '../../theme/colors';
import { WALLET_KEY } from '../../config/constants';
import { StackNavigation } from '../../route';
import Symbol7 from '../../../assets/icons/symbol7.svg'

interface ViewWalletButtonProps {
    style?: any;
    buttonText?: string;
}

const ViewWalletButton: FC<ViewWalletButtonProps> = ({
    style,
    buttonText = "View Wallet on Explorer"
}) => {
    const navigation = useNavigation<StackNavigation>();

    const handleViewWallet = async () => {
        const wallet = await AsyncStorage.getItem(WALLET_KEY);
        if (wallet) {
            navigation.navigate('Transaction', {
                title: 'Your Wallet',
                url: `https://explorer.hiro.so/address/${wallet}?chain=testnet`
            });
        }
    };

    return (
        <TouchableOpacity
            style={[styles.viewWalletButton, style]}
            onPress={handleViewWallet}
        >
            <Symbol7 width={35} height={35} />
            <Text style={styles.viewWalletButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewWalletButton: {
        backgroundColor: BLOOD_ORANGE,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    viewWalletButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default ViewWalletButton;