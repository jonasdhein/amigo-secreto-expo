import { Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../../themes/global";
import { useEffect, useState } from "react";
import { IContact } from "../../@types/contact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "../../components/Icon";

import styles from './styles'

//com o expo-router, todas as telas precisam retornar DEFAULT
export default function Contacts() {

    const [contact, setContact] = useState<IContact>({} as IContact);
    const [contactsList, setContactsList] = useState<IContact[]>([]);

    const save = () => {

        let maxId = 0;
        contactsList.map(item => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        })
        
        const newList = [...contactsList,
        {
            id: maxId + 1,
            name: contact.name,
            number: contact.number
        }
        ];

        setContactsList(newList);
        storeData(newList);
        setContact({
            name: '',
            number: ''
        } as IContact) //Limpar o objeto de contato utilizado
    }

    const storeData = async (value: IContact[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('contacts_list', jsonValue);
        } catch (e) {
            // saving error
            console.log("🚀 ~ storeData ~ e:", e);
        }
    };

    const getData = async (): Promise<IContact[]> => {
        try {

            const jsonValue = await AsyncStorage.getItem('contacts_list');

            if (jsonValue != null) {
                const parsed = JSON.parse(jsonValue);
                console.log("🚀 ~ getData ~ parsed:", parsed)
                return parsed;
            } else {
                return [];
            }

        } catch (e) {
            console.error("Erro ao ler os dados:", e);
            return [];
        }
    };

    const removeItem = (id: number) => {
        try {
            Alert.alert('Remover Item', 'Tem certeza disso?', [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        console.log('Operação cancelada');
                    }
                },
                {
                    text: 'Sim',
                    onPress: () => {

                        const newList = contactsList.filter(item => item.id != id);

                        setContactsList(newList);
                        storeData(newList);
                    }
                }
            ])
        } catch (err) {
            console.log("🚀 ~ removeItem ~ err:", err)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            const fetch = await getData();
            setContactsList(fetch);
        }

        fetchData();

    }, []);

    const Item = ({ id, name, number }: IContact) => (
        <View style={styles.item}>
            <Text style={styles.contact}>{name} - {number}</Text>
            <TouchableOpacity
                onPress={() => removeItem(id)}>
                <Icon name='trash' size={18} color={colors.red} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={theme.container}>

            <View style={styles.form}>
                <TextInput
                    style={theme.input}
                    onChangeText={(value) => setContact({
                        ...contact,
                        name: value
                    })}
                    placeholder="Nome"
                    autoCapitalize="characters"
                    value={contact.name}
                />

                <TextInput
                    style={theme.input}
                    onChangeText={(value) => setContact({
                        ...contact,
                        number: value
                    })}
                    placeholder="Telefone"
                    value={contact.number}
                />

                <TouchableOpacity
                    onPress={() => save()}>
                    <Icon name='save' size={38} color={colors.primary} />
                </TouchableOpacity>
            </View>


            <Text style={[theme.title, theme.marginTop]}>Lista de Contatos:</Text>

            <FlatList
                data={contactsList}
                renderItem={({ item }) =>
                    <Item id={item.id} name={item.name} number={item.number} />
                }
                ListEmptyComponent={<Text style={styles.placeholder}>Lista Vazia</Text>}
                keyExtractor={item => item.id.toString()}
            />

        </SafeAreaView>
    )
}