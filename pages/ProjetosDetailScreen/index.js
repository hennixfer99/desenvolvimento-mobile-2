import { StyleSheet, View } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceExpandCard from "../../components/ServiceExpandCard";
import { GlobalColors } from "../../constants/colors";

const SERVICES = [
    {
        title: "Projetos de Prevenção e Combate à Incêndio - PPCI",
        description:
            "Conjunto de medidas técnicas e estruturais para prevenir, controlar e combater incêndios em edificações. Define a localização de extintores, hidrantes, sprinklers, sinalização, rotas de fuga, iluminação de emergência e sistemas de detecção e alarme.",
        pratica:
            "O engenheiro faz levantamento da edificação, calcula a carga de incêndio, classifica o risco e dimensiona todos os sistemas de proteção conforme as Instruções Técnicas do Corpo de Bombeiros estadual. Entrega projeto completo com plantas, memoriais e especificações para aprovação.",
    },
    {
        title: "Projetos e Laudos para AVCB / CLCB",
        description:
            "Elaboração de projetos técnicos e laudos necessários para obtenção do AVCB (Auto de Vistoria do Corpo de Bombeiros) ou CLCB (Certificado de Licenciamento do Corpo de Bombeiros). Obrigatório para funcionamento legal de edificações.",
        pratica:
            "Após aprovação do projeto de incêndio, o engenheiro acompanha a instalação dos sistemas, realiza testes de funcionamento, reúne toda a documentação exigida e agenda a vistoria com o Corpo de Bombeiros, acompanhando presencialmente até a emissão do certificado.",
    },
    {
        title: "Testes e Laudos de Eficiência para Máquinas",
        description:
            "Serviço que abrange testes de desempenho e emissão de laudos de eficiência energética e operacional de máquinas e equipamentos industriais. Avalia rendimento, consumo energético, capacidade produtiva e conformidade com normas técnicas.",
        pratica:
            "São instalados instrumentos de medição (analisadores de energia, medidores de vazão, sensores de temperatura e pressão) durante a operação normal do equipamento. Os dados coletados são comparados com as especificações nominais e normas aplicáveis, resultando em laudo com índices de eficiência e recomendações de otimização.",
    },
    {
        title: "Projetos Mecânicos e Estruturais",
        description:
            "Desenvolvimento completo de projetos mecânicos e estruturais, incluindo dimensionamento, cálculos de resistência, modelagem 3D, detalhamento de fabricação e documentação técnica. Abrange estruturas metálicas, dispositivos, máquinas especiais e tubulações.",
        pratica:
            "O engenheiro levanta as necessidades do cliente, elabora o conceito, realiza modelagem 3D e simulações (FEA), dimensiona componentes, detalha desenhos de fabricação com tolerâncias e acabamentos, gera lista de materiais e emite memorial de cálculo com ART para execução.",
    },
];

export default function ProjetosDetailScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Projetos" />
            {SERVICES.map((service, index) => (
                <ServiceExpandCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    pratica={service.pratica}
                />
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.BACKGROUND,
        padding: 20,
    },
});
