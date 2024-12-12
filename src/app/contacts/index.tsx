import { Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../../themes/global";
import { useContext, useEffect, useState } from "react";
import { IContact } from "../../@types/contact";
import { Icon } from "../../components/Icon";

import styles from './styles'
import { AppContext } from "../../contexts/AppContext";

//com o expo-router, todas as telas precisam retornar DEFAULT
export default function Contacts() {

    const { contactsList, storeData } = useContext(AppContext);
    const [contact, setContact] = useState<IContact>({} as IContact);
    
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

        storeData(newList);
        setContact({
            name: '',
            number: ''
        } as IContact) //Limpar o objeto de contato utilizado
    }

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

                        storeData(newList);
                    }
                }
            ])
        } catch (err) {
            console.log("🚀 ~ removeItem ~ err:", err)
        }
    }

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
                    style={[theme.input, { width: '40%' }]}
                    onChangeText={(value) => setContact({
                        ...contact,
                        name: value
                    })}
                    placeholder="Nome"
                    autoCapitalize="characters"
                    value={contact.name}
                />

                <TextInput
                    style={[theme.input, { width: '40%' }]}
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