import { View, Text, StyleSheet } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceDetailCard from "../../components/ServiceDetailCard";
import GreenBanner from "../../components/GreenBanner";
import { GlobalColors } from "../../constants/colors";

const SERVICES = [
    {
        key: "Inspecoes",
        title: "Inspeções e Vistorias",
        items: [
            "Auditoria e Adequação NR-11",
            "Auditoria e Adequação NR-12",
            "Inspeção e Adequação NR-13",
            "Vistorias para Alvarás",
            "Laudos de Engenharia",
            "Laudos de Insalubridade LTCAT NR-15",
            "Laudos de Periculosidade NR-16",
            "Laudos de Ergonomia NR-17",
        ],
    },
    {
        key: "Projetos",
        title: "Projetos",
        items: [
            "Projetos de Prevenção e Combate à Incêndio - Programa PPCI",
            "Projetos e Laudos para AVCB / CLCB",
            "Projetos, testes e laudos de eficiência para máquinas e equipamentos",
            "Projetos Mecânicos e Estruturais",
        ],
    },
    {
        key: "Manutencao",
        title: "Manutenção",
        items: [
            "Compressores de Ar",
            "Sistemas de Ar Condicionado - PMOC",
            "Elevadores e Rampas Automotivas",
            "Sistemas de Exaustão",
            "Bombas centrífugas e hidráulicas",
            "Máquinas e Equipamentos Industriais",
        ],
    },
    {
        key: "Treinamentos",
        title: "Treinamentos e Gestão",
        items: [
            "Treinamento e Certificação para Brigadas de Incêndio",
            "Programas de Gestão de Segurança",
            "Responsabilidade Técnica para Desmanches",
            "Engenheiro Perito Técnico para Processos Judiciais",
        ],
    },
];

export default function ServicosScreen({ navigateToDetail }) {
    return (
        <View style={s.container}>
            <SectionTitle text="Serviços" />
            <View style={s.cardsRow}>
                {SERVICES.map((service, index) => (
                    <ServiceDetailCard
                        key={index}
                        title={service.title}
                        items={service.items}
                        onPress={() => navigateToDetail(service.key)}
                    />
                ))}
            </View>
            <GreenBanner>
                <Text style={s.quote}>"Buscando a segurança todo dia!"</Text>
                <Text style={s.title}>Segurança em 1° lugar!</Text>
                <Text style={s.subtitle}>
                    A VIDA das PESSOAS é a nossa prioridade.
                </Text>
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
    quote: {
        fontSize: 14,
        color: GlobalColors.WHITE,
        fontStyle: "italic",
        marginBottom: 10,
        opacity: 0.9,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: GlobalColors.WHITE,
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: GlobalColors.WHITE,
        textAlign: "center",
        opacity: 0.9,
    },
});
