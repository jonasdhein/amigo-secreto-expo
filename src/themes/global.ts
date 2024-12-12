import { StyleSheet } from "react-native";

export const colors = {
    primary: '#3949AB',
    secondary: '#9FA8DA',
    black: '#263238',
    background: '#ECEFF1',
    backgroundInut: '#FAFAFA',
    placeHolder: '#B0BEC5',
    white: '#ECEFF1',
    red: '#D84315'
}

export const theme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8
    },
    button: {
        borderRadius: 16,
        backgroundColor: colors.primary,
        padding: 16,
        width: '45%',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 16,
        color: colors.white
    },
    title: {
        fontSize: 24,
        color: colors.primary
    },
    input: {
        height: 44,
        backgroundColor: colors.backgroundInut,
        fontSize: 16,
        padding: 12,
        borderWidth: 0.5,
        borderColor: colors.placeHolder,
        borderRadius: 8,
    },
    marginL: {
        marginLeft: 8
    },
    marginR: {
        marginRight: 8
    },
    marginBottom: {
        marginBottom: 16
    },
    marginTop: {
        marginTop: 16
    }
})