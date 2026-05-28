import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/colors";

export default function ServiceExpandCard({ title, description, pratica }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setExpanded(!expanded)}
        >
            <View style={styles.greenBar} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={GlobalColors.PRIMARY}
                    />
                </View>
                {expanded && (
                    <View style={styles.details}>
                        <Text style={styles.descriptionLabel}>Descrição</Text>
                        <Text style={styles.description}>{description}</Text>
                        <Text style={styles.exampleLabel}>Prática</Text>
                        <Text style={styles.example}>{pratica}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 10,
        marginBottom: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    greenBar: {
        width: 5,
        backgroundColor: GlobalColors.PRIMARY,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY_DARK,
        flex: 1,
        marginRight: 10,
    },
    details: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: GlobalColors.BORDER,
        paddingTop: 12,
    },
    descriptionLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 13,
        color: GlobalColors.TEXT_MEDIUM,
        lineHeight: 20,
        marginBottom: 14,
    },
    exampleLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: GlobalColors.ACCENT,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    example: {
        fontSize: 13,
        color: GlobalColors.TEXT_DARK,
        lineHeight: 20,
        fontStyle: "italic",
    },
});
