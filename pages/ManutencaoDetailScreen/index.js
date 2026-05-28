import { StyleSheet, View } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceExpandCard from "../../components/ServiceExpandCard";
import { GlobalColors } from "../../constants/colors";

const SERVICES = [
    {
        title: "Compressores de Ar",
        description:
            "Manutenção preventiva e corretiva de compressores de ar (pistão, parafuso, centrífugo), incluindo verificação de filtros, válvulas, pressostatos, separadores de óleo, sistema de refrigeração e alinhamento de acoplamentos.",
        pratica:
            "Técnicos seguem checklist baseado em horas de operação: trocam filtros de ar e óleo, verificam correia ou acoplamento, medem temperatura de descarga, testam válvulas de segurança, analisam vibração dos rolamentos e calibram o pressostato. Tudo é registrado em ordem de serviço com recomendações para a próxima intervenção.",
    },
    {
        title: "Sistemas de Ar Condicionado - PMOC",
        description:
            "Elaboração e execução do PMOC (Plano de Manutenção, Operação e Controle), obrigatório pela Lei 13.589/2018 para edificações com ambientes climatizados artificialmente. Define procedimentos e periodicidade de verificação dos sistemas de climatização.",
        pratica:
            "O responsável técnico elabora o PMOC definindo frequência de limpeza de filtros, verificação de drenos, medição de temperatura e umidade, análise de qualidade do ar e inspeção de componentes. A equipe executa as manutenções conforme cronograma e registra tudo em relatórios para fiscalização da Vigilância Sanitária.",
    },
    {
        title: "Elevadores e Rampas Automotivas",
        description:
            "Manutenção preventiva e corretiva de elevadores automotivos (de coluna, tesoura, pantográfico) e rampas de geometria. Inclui inspeção de cilindros hidráulicos, vedações, mangueiras, travas de segurança e sistemas elétricos.",
        pratica:
            "A cada trimestre, os técnicos inspecionam vedações dos cilindros hidráulicos, verificam nível e qualidade do fluido, testam travas mecânicas de segurança, conferem cabos de aço e seus tensionamentos, e testam os fins de curso elétricos. Componentes com desgaste são substituídos preventivamente.",
    },
    {
        title: "Sistemas de Exaustão",
        description:
            "Projeto, instalação e manutenção de sistemas de exaustão industrial para remoção de gases, vapores, fumos, poeira e partículas do ambiente de trabalho. Inclui dimensionamento de dutos, seleção de ventiladores e filtros.",
        pratica:
            "A manutenção inclui limpeza de dutos e coifas, troca de filtros saturados, balanceamento dinâmico do ventilador, verificação de correias e rolamentos, medição de velocidade de captura nos pontos de exaustão e ajuste de dampers para garantir a vazão de projeto.",
    },
    {
        title: "Bombas Centrífugas e Hidráulicas",
        description:
            "Manutenção preventiva e corretiva de bombas centrífugas e sistemas hidráulicos industriais, incluindo verificação de rotores, selos mecânicos, rolamentos, alinhamento de eixos e análise de cavitação.",
        pratica:
            "O técnico realiza alinhamento a laser do conjunto motor-bomba, substitui selo mecânico e rolamentos conforme plano de manutenção, verifica NPSH disponível, coleta amostra de vibração para análise preditiva e registra curva de desempenho (vazão x pressão) para comparação com dados de referência.",
    },
    {
        title: "Máquinas e Equipamentos Industriais",
        description:
            "Manutenção preventiva, preditiva e corretiva de máquinas e equipamentos industriais como tornos, fresadoras, injetoras, prensas, esteiras e robôs industriais. Inclui lubrificação, análise de vibração, termografia e alinhamento.",
        pratica:
            "A equipe de manutenção segue plano baseado em confiabilidade (RCM), realizando lubrificação programada, coleta de dados de vibração e termografia nos pontos críticos, verificação de folgas e desgastes, substituição de componentes conforme vida útil e registro de indicadores MTBF e MTTR para melhoria contínua.",
    },
];

export default function ManutencaoDetailScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Manutenção" />
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
