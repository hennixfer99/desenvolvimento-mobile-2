import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/colors";

export default function ClientCard({ icon, label }) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name={icon}
                    size={22}
                    color={GlobalColors.PRIMARY}
                />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        width: "30%",
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: GlobalColors.ICON_BG,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        fontSize: 11,
        fontWeight: "600",
        color: GlobalColors.TEXT_DARK,
        textAlign: "center",
    },
});
