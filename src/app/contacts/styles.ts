import { StyleSheet } from "react-native";
import { colors } from "../../themes/global";

export const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: colors.placeHolder
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        color: colors.black
    },
    itemTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contact : {
        fontSize: 14,
        color: colors.primary
    },
    form: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});