import { View, StyleSheet } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ClientCard from "../../components/ClientCard";
import { GlobalColors } from "../../constants/colors";

const CLIENTS = [
    { icon: "factory", label: "Indústrias" },
    { icon: "store", label: "Redes de Comércio" },
    { icon: "local-shipping", label: "Terminais Logísticos" },
    { icon: "home", label: "Condomínios Residenciais" },
    { icon: "directions-car", label: "Oficinas Automotivas" },
    { icon: "engineering", label: "Prestadores de Serviços" },
];

export default function ClientesScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Nossos Clientes" />
            <View style={s.cardsRow}>
                {CLIENTS.map((client, index) => (
                    <ClientCard
                        key={index}
                        icon={client.icon}
                        label={client.label}
                    />
                ))}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.BACKGROUND,
        padding: 20,
    },
    cardsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
