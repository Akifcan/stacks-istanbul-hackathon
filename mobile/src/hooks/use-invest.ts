import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { WALLET_KEY } from "../config/constants";
import api from "../config/api";

const useInvest = () => {

     const { data: invests, isLoading } = useQuery<Invest[]>({
        queryKey: ['invests'],
        queryFn: async () => {
            const wallet = await AsyncStorage.getItem(WALLET_KEY);
            const response = await api.get<Invest[]>('/invests', {
                headers: {
                    'wallet': wallet
                }
            });
            return response.data;
        },
    })

    return {
        invests,
        isLoading
    }

}

export default useInvest