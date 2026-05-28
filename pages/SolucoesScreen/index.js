import { View, Text, StyleSheet } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceCard from "../../components/ServiceCard";
import GreenBanner from "../../components/GreenBanner";
import { GlobalColors } from "../../constants/colors";

const SOLUTIONS = [
    {
        icon: "search",
        title: "Inspeções e Vistorias",
        description: "Em conformidade com a legislação e normas técnicas",
    },
    {
        icon: "document-text",
        title: "Projetos",
        description:
            "Personalização de soluções de acordo com as práticas e padrões reconhecidos da engenharia",
    },
    {
        icon: "build",
        title: "Planos de Manutenção",
        description:
            "Garantir a confiabilidade operacional e segurança para as instalações e pessoas",
    },
    {
        icon: "people",
        title: "Treinamentos e Gestão",
        description:
            "Padronizar e compartilhar metodologias e estratégias corporativas",
    },
];

export default function SolucoesScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Nossas Soluções" />
            <View style={s.cardsRow}>
                {SOLUTIONS.map((item, index) => (
                    <ServiceCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </View>
            <Text style={s.mapTitle}>Alcançando todo o Brasil!</Text>
            <Text style={s.mapSubtitle}>
                Trabalhamos com clientes em todo território nacional
            </Text>
            <GreenBanner>
                <Text style={s.mapText}>Mapa do Brasil - Atuação Nacional</Text>
            </GreenBanner>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.WHITE,
        padding: 20,
    },
    cardsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    mapTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    mapSubtitle: {
        fontSize: 14,
        color: GlobalColors.TEXT_MEDIUM,
        textAlign: "center",
        marginBottom: 20,
    },
    mapText: {
        color: GlobalColors.WHITE,
        fontSize: 16,
        fontWeight: "600",
    },
});
