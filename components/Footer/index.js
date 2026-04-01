import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                © 2026 Imperial Engenharia. Todos os direitos reservados.
            </Text>
            <Text style={styles.subtext}>
                Soluções em Engenharia | Segurança em 1° lugar
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.PRIMARY_DARK,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    text: {
        color: GlobalColors.WHITE,
        fontSize: 12,
        textAlign: "center",
        opacity: 0.9,
    },
    subtext: {
        color: GlobalColors.WHITE,
        fontSize: 11,
        textAlign: "center",
        opacity: 0.7,
        marginTop: 4,
    },
});
