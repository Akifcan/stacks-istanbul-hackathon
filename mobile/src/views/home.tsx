import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StackNavigation } from "../route";
import { BLACK } from "../theme/colors";
import Symbol3 from '../../assets/icons/symbol3.svg'
import Header from '../components/home/Header';
import TabNavigation from '../components/home/TabNavigation';
import Portfolio from '../components/home/Portfolio';
import Purchases from '../components/home/Purchases';
import Spending from '../components/home/Spending';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type TabType = 'portfolio' | 'purchases' | 'spending';

const Home: FC<Props> = () => {
    const navigation = useNavigation<StackNavigation>()
    const [activeTab, setActiveTab] = useState<TabType>('portfolio');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'portfolio':
                return <Portfolio />;
            case 'purchases':
                return <Purchases />;
            case 'spending':
                return <Spending />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export default Home