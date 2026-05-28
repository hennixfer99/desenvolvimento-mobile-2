import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/colors";

export default function ServiceDetailCard({ title, items, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.greenBar} />
            <View style={styles.content}>
                <View style={styles.topSection}>
                    <Text style={styles.title}>{title}</Text>
                    {items.map((item, index) => (
                        <Text key={index} style={styles.item}>
                            • {item}
                        </Text>
                    ))}
                </View>
                <View style={styles.seeMore}>
                    <Text style={styles.seeMoreText}>Ver detalhes</Text>
                    <Ionicons
                        name="arrow-forward"
                        size={14}
                        color={GlobalColors.PRIMARY}
                    />
                </View>
            </View>
        </TouchableOpacity>
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
        justifyContent: "space-between",
    },
    topSection: {
        flex: 1,
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
    seeMore: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: GlobalColors.BORDER,
    },
    seeMoreText: {
        fontSize: 13,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        marginRight: 4,
    },
});
