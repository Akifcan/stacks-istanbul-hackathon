import { FC } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { BLOOD_ORANGE, TEXT_COLOR } from '../../theme/colors';

type TabType = 'portfolio' | 'purchases' | 'spending';

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'portfolio' && styles.activeTab]}
                onPress={() => onTabChange('portfolio')}
            >
                <Text style={[styles.tabText, activeTab === 'portfolio' && styles.activeTabText]}>
                    Portfolio
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'purchases' && styles.activeTab]}
                onPress={() => onTabChange('purchases')}
            >
                <Text style={[styles.tabText, activeTab === 'purchases' && styles.activeTabText]}>
                    Purchases
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'spending' && styles.activeTab]}
                onPress={() => onTabChange('spending')}
            >
                <Text style={[styles.tabText, activeTab === 'spending' && styles.activeTabText]}>
                    Spending
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default TabNavigation;