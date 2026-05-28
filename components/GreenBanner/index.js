import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function GreenBanner({ children, dark, style }) {
    return (
        <View style={[styles.container, dark && styles.containerDark, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.PRIMARY,
        borderRadius: 12,
        padding: 25,
        alignItems: "center",
        marginTop: 30,
    },
    containerDark: {
        backgroundColor: GlobalColors.PRIMARY_DARK,
    },
});
