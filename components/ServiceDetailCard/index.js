import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function ServiceDetailCard({ title, items }) {
    return (
        <View style={styles.card}>
            <View style={styles.greenBar} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {items.map((item, index) => (
                    <Text key={index} style={styles.item}>
                        • {item}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 12,
        width: "47%",
        marginBottom: 15,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
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
        fontSize: 15,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        marginBottom: 10,
    },
    item: {
        fontSize: 12,
        color: GlobalColors.TEXT_MEDIUM,
        marginBottom: 5,
        lineHeight: 18,
    },
});
