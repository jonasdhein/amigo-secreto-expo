import { createContext, ReactNode, useState } from "react";
import { IContact } from "../@types/contact";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IContext {
    contactsList: IContact[],
    getContacts: () => void,
    storeData: (value: IContact[]) => void,
}

//* axios default pode ser colocado aqui

//é a exportacao utilizada nas telas onde se quer buscar algum dado do contexto
export const AppContext = createContext<IContext>({} as IContext);

//é a exportacao utilizada para envolver as telas do app
export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [contactsList, setContactsList] = useState<IContact[]>([]);

    const getContacts = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem('contacts_list');

            if (jsonValue != null) {
                const parsed = JSON.parse(jsonValue);
                setContactsList(parsed);
            } else {
                return [];
            }

        } catch (e) {
            console.error("Erro ao ler os dados:", e);
            return [];
        }
    };

    const storeData = async (value: IContact[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('contacts_list', jsonValue);

            setContactsList(value);

        } catch (e) {
            // saving error
            console.log("🚀 ~ storeData ~ e:", e);
        }
    };

    return (
        <AppContext.Provider
            value={
                {
                    contactsList: contactsList,
                    getContacts: getContacts,
                    storeData: storeData
                }
            }>
            {children}
        </AppContext.Provider>
    )
}