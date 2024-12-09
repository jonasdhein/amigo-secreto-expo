import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../contexts/AppContext";

export default function Layout() {
    return (
        <>
            <StatusBar style="auto" />
            <AppProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Home" }} />
                    <Stack.Screen name="contacts/index" options={{ title: "Contatos" }} />
                </Stack>
            </AppProvider>
        </>
    )
}