import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/colors";

export default function ServiceCard({ icon, title, description }) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={GlobalColors.PRIMARY} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        width: "47%",
        marginBottom: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: GlobalColors.ICON_BG,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 12,
        color: GlobalColors.TEXT_MEDIUM,
        textAlign: "center",
        lineHeight: 18,
    },
});
