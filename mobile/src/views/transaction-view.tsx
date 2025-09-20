import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { BLACK, TEXT_COLOR } from "../theme/colors";
import { StackNavigation } from "../route";

type Props = NativeStackScreenProps<RootStackParamList, 'Transaction'>;

const TransactionView: FC<Props> = ({ route }) => {
    const navigation = useNavigation<StackNavigation>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{route.params?.title || 'Transaction Details'}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* WebView */}
            <WebView source={{ uri: route.params.url }} style={styles.webview} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: TEXT_COLOR,
        fontWeight: '300',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
    placeholder: {
        width: 40,
    },
    webview: {
        flex: 1,
    },
});

export default TransactionView;