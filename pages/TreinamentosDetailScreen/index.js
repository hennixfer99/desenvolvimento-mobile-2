import { StyleSheet, View } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceExpandCard from "../../components/ServiceExpandCard";
import { GlobalColors } from "../../constants/colors";

const SERVICES = [
    {
        title: "Treinamento e Certificação para Brigadas de Incêndio",
        description:
            "Formação e reciclagem de brigadistas conforme NBR 14276 e Instruções Técnicas do Corpo de Bombeiros (IT-17), abrangendo prevenção e combate a princípios de incêndio, primeiros socorros, evacuação de áreas e uso de equipamentos de combate. A certificação é obrigatória para obtenção e renovação do AVCB/CLCB.",
        pratica:
            "A equipe de instrutores realiza aulas teóricas sobre classes de incêndio, triângulo do fogo e procedimentos de evacuação, seguidas de exercícios práticos com uso de extintores (CO2, pó químico, espuma), mangueiras de hidrante e técnicas de primeiros socorros. Ao final, aplica-se avaliação teórica e prática, com emissão de certificado individual válido conforme a IT-17.",
    },
    {
        title: "Programas de Gestão de Segurança",
        description:
            "Desenvolvimento e implementação de programas integrados de gestão de segurança do trabalho, incluindo PGR (Programa de Gerenciamento de Riscos), PPCI, PCMSO e análises de risco. Abrange identificação de perigos, avaliação e controle de riscos, inspeções periódicas e treinamento de equipes.",
        pratica:
            "O engenheiro de segurança realiza o levantamento de todos os riscos da planta, elabora o inventário de riscos e plano de ação do PGR, define procedimentos de bloqueio e etiquetagem (LOTO), implanta rotinas de inspeção por checklist, estabelece indicadores de desempenho (taxa de frequência, gravidade) e treina líderes e operadores nos procedimentos de segurança.",
    },
    {
        title: "Responsabilidade Técnica para Desmanches",
        description:
            "Serviço de responsabilidade técnica exigido pela Resolução CONTRAN nº 881/2021 para empresas de desmontagem de veículos. O engenheiro mecânico atua como RT, supervisionando recepção, desmontagem, classificação, armazenamento e destinação de peças.",
        pratica:
            "O engenheiro responsável técnico acompanha a entrada de veículos, verifica documentação de procedência, supervisiona o processo de desmontagem seguindo procedimentos padronizados, avalia a integridade de componentes para reaproveitamento, emite laudos de classificação de peças e mantém o controle de rastreabilidade exigido pelo DETRAN para cada item desmontado.",
    },
    {
        title: "Engenheiro Perito Técnico para Processos Judiciais",
        description:
            "Atuação de engenheiro como perito judicial ou assistente técnico em processos judiciais, conforme Código de Processo Civil. Realiza vistorias, ensaios, análises técnicas e elabora laudos periciais sobre questões de engenharia. Deve seguir normas da ABNT e o Código de Ética do CONFEA.",
        pratica:
            "O engenheiro perito recebe a nomeação judicial, analisa os autos do processo, realiza vistoria in loco com registro fotográfico detalhado, coleta amostras e dados técnicos, executa ensaios não destrutivos quando necessário, elabora o laudo pericial respondendo aos quesitos das partes e do juízo, e comparece em audiência para esclarecer o laudo quando convocado.",
    },
];

export default function TreinamentosDetailScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Treinamentos e Gestão" />
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
