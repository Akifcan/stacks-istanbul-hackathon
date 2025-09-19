import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackNavigation } from "../route";
import { BLACK, BLOOD_ORANGE, TEXT_COLOR, BITCOIN_ORANGE } from "../theme/colors";
import Symbol3 from '../../assets/icons/symbol3.svg'
import Symbol4 from '../../assets/icons/symbol4.svg'
import Stacks from '../../assets/icons/stacks.svg'
import Wallet from '../../assets/icons/wallet.svg'
import Settings from '../../assets/icons/settings.svg'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type TabType = 'portfolio' | 'purchases' | 'spending';

interface Purchase {
    id: string;
    amount: number;
    stxAmount: number;
    date: string;
    type: 'auto' | 'manual';
}

interface SpendingItem {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
}

const Home: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>()
    const [activeTab, setActiveTab] = useState<TabType>('portfolio');

    // Mock data
    const stxBalance = 125.50;
    const stxPrice = 0.85;
    const totalValue = stxBalance * stxPrice;

    const recentPurchases: Purchase[] = [
        { id: '1', amount: 5, stxAmount: 5.88, date: '2024-01-15', type: 'auto' },
        { id: '2', amount: 5, stxAmount: 5.95, date: '2024-01-14', type: 'auto' },
        { id: '3', amount: 10, stxAmount: 11.76, date: '2024-01-13', type: 'manual' },
        { id: '4', amount: 5, stxAmount: 6.02, date: '2024-01-12', type: 'auto' },
        { id: '5', amount: 5, stxAmount: 5.81, date: '2024-01-11', type: 'auto' },
    ];

    const recentSpending: SpendingItem[] = [
        { id: '1', merchant: 'Starbucks', amount: 12.50, date: '2024-01-15', category: 'Food' },
        { id: '2', merchant: 'Uber', amount: 18.75, date: '2024-01-15', category: 'Transport' },
        { id: '3', merchant: 'Amazon', amount: 45.99, date: '2024-01-14', category: 'Shopping' },
        { id: '4', merchant: 'Netflix', amount: 15.99, date: '2024-01-14', category: 'Entertainment' },
        { id: '5', merchant: 'Target', amount: 67.43, date: '2024-01-13', category: 'Shopping' },
    ];

    const renderPurchaseItem = ({ item }: { item: Purchase }) => (
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'portfolio':
                return (
                    <View style={styles.portfolioSection}>
                        <View style={styles.balanceCard}>
                            <Text style={styles.balanceLabel}>STX Balance</Text>
                            <Text style={styles.balanceAmount}>{stxBalance.toFixed(2)} <Stacks width={30} height={30} /></Text>
                            <Text style={styles.balanceValue}>${totalValue.toFixed(2)} USD</Text>
                            <Text style={styles.priceInfo}>1 STX = ${stxPrice}</Text>
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
            case 'purchases':
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.sectionTitle}>Recent Purchases</Text>
                        <FlatList
                            data={recentPurchases}
                            keyExtractor={(item) => item.id}
                            renderItem={renderPurchaseItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                );
            case 'spending':
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
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                        <Symbol4 width={40} height={40} />
                    </View>
                    <Text style={styles.welcomeText}>Account</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Text style={styles.headerButtonText}><Wallet width={30} height={30} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Text style={styles.headerButtonText}><Settings width={17} height={17} /></Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'portfolio' && styles.activeTab]}
                    onPress={() => setActiveTab('portfolio')}
                >
                    <Text style={[styles.tabText, activeTab === 'portfolio' && styles.activeTabText]}>
                        Portfolio
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'purchases' && styles.activeTab]}
                    onPress={() => setActiveTab('purchases')}
                >
                    <Text style={[styles.tabText, activeTab === 'purchases' && styles.activeTabText]}>
                        Purchases
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'spending' && styles.activeTab]}
                    onPress={() => setActiveTab('spending')}
                >
                    <Text style={[styles.tabText, activeTab === 'spending' && styles.activeTabText]}>
                        Spending
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {renderTabContent()}
            </ScrollView>
            <Symbol3 style={styles.icon} width={500} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom: -50,
        left: -100,
        zIndex: -1
    },
    container: {
        flex: 1,
        backgroundColor: BLACK,
    },
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
    avatarText: {
        fontSize: 20,
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: BLOOD_ORANGE,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
        fontFamily: 'IBMPlexMono-Medium'
    },
    activeTabText: {
        color: TEXT_COLOR,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
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
    bottomNav: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#1a1a1a',
        backgroundColor: BLACK,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    navLabel: {
        fontSize: 12,
        color: TEXT_COLOR,
        fontFamily: 'IBMPlexMono-Medium'
    },
});

export default Home