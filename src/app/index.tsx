import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../themes/global";
import { router } from "expo-router";
import { Icon } from "../components/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IContact } from "../@types/contact";

//com o expo-router, todas as telas precisam retornar DEFAULT
export default function App() {

    async function realizarSorteio() {
        try {

            const jsonValue = await AsyncStorage.getItem('contacts_list');

            if (jsonValue != null) {
                const parsed = JSON.parse(jsonValue);

                let participantes: IContact[] = parsed;

                let sorteados: number[] = [];

                let notSort;
                for (let x = 0; x < participantes.length; x++) {

                    notSort = true;

                    while (notSort) {
                        const random = parseInt((Math.random() * participantes.length).toString());
                        if (random != x && !sorteados.includes(random)) {
                            participantes[x].idFriend = random;
                            sorteados.push(random);
                            notSort = false;
                        }
                    }
                }

                console.log('SORTEIO = ', participantes);


            }


        } catch (err) {
            console.log("🚀 ~ realizarSorteio ~ err:", err)
        }
    }

    return (
        <SafeAreaView style={theme.container}>

            <Text style={theme.title}>App Amigo Secreto</Text>

            <View style={theme.marginBottom}>
                <Icon
                    name="handshake-o"
                    color={colors.primary}
                    size={40} />
            </View>

            <TouchableOpacity
                onPress={() => router.navigate('contacts')}
                style={[theme.button, theme.marginBottom]}>
                <Text style={theme.textButton}>CONTATOS</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => realizarSorteio()}
                style={[theme.button, theme.marginBottom]}>
                <Text style={theme.textButton}>REALIZAR SORTEIO</Text>
            </TouchableOpacity>

        </SafeAreaView >
    )
}