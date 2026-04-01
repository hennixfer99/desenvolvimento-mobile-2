import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function PrincipleCard({ title, description }) {
    return (
        <View style={styles.card}>
            <View style={styles.greenBar} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 12,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        minHeight: 200,
    },
    greenBar: {
        width: 5,
        backgroundColor: GlobalColors.PRIMARY,
    },
    content: {
        flex: 1,
        padding: 18,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        marginBottom: 10,
    },
    description: {
        fontSize: 13,
        color: GlobalColors.TEXT_MEDIUM,
        lineHeight: 20,
    },
});
