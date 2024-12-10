import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../../themes/global";
import { router } from "expo-router";
import { Icon } from "../../components/Icon";
import { IContact } from "../../@types/contact";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

//com o expo-router, todas as telas precisam retornar DEFAULT
export default function Home() {

    const { contactsList, getContacts } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    async function realizarSorteio() {
        try {

            let participantes: IContact[] = contactsList;

            if (participantes.length > 2) {
                //cria um array de números para armazenar os IDs já sorteados
                let sorteados: number[] = [];

                let notSort: boolean;
                //percorre a lista de contatos
                for (let x = 0; x < participantes.length; x++) {

                    notSort = true;

                    while (notSort) {
                        const random = parseInt((Math.random() * participantes.length).toString());
                        /*verifica se o sorteado é diferente do participante em questão
                        e o sorteado não pode estar na lista de contatos já sorteados */
                        if (random != x && !sorteados.includes(random)) {
                            participantes[x].idFriend = participantes[random].id;
                            sorteados.push(random); //adiciona o n sorteado na lista de sorteados
                            notSort = false;
                        } else if (random === x && x === participantes.length - 1) {
                            console.log("🚀 ~ o último pegou o último");
                            participantes[x].idFriend = participantes[0].idFriend;
                            participantes[0].idFriend = participantes[random].id;
                            sorteados.push(random); //adiciona o n sorteado na lista de sorteados
                            notSort = false;
                        }
                        console.log("🚀 ~ realizarSorteio ~ random:", random, sorteados);
                    }
                }

                console.log('SORTEIO = ', participantes);
                //o que fazer agora???

            } else {
                Alert.alert('Atenção', 'Número de participantes é insuficiente');
            }

            setLoading(false);

        } catch (err) {
            console.log("🚀 ~ realizarSorteio ~ err:", err);
            setLoading(false);
        }
    }

    useEffect(() => {

        getContacts();

    }, []);

    return (
        <SafeAreaView style={theme.container}>

            {loading && <ActivityIndicator size="large" />}

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
                onPress={() => {
                    setLoading(true);

                    setTimeout(realizarSorteio, 1000);

                    //const refInterval = setInterval(() => realizarSorteio(), 1000);
                    //console.log("🚀 ~ App ~ refInterval:", refInterval)
                    //clearInterval(refInterval);
                }}
                style={[theme.button, theme.marginBottom]}>
                <Text style={theme.textButton}>REALIZAR SORTEIO</Text>
            </TouchableOpacity>

        </SafeAreaView >
    )
}