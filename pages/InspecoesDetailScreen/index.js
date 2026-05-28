import { StyleSheet, View } from "react-native";
import SectionTitle from "../../components/SectionTitle";
import ServiceExpandCard from "../../components/ServiceExpandCard";
import { GlobalColors } from "../../constants/colors";

const SERVICES = [
    {
        title: "Auditoria e Adequação NR-11",
        description:
            "Serviço de inspeção e adequação conforme a NR-11, que regulamenta procedimentos de segurança para transporte, movimentação, armazenagem e manuseio de materiais. Abrange equipamentos como pontes rolantes, talhas, guindastes, empilhadeiras, esteiras e elevadores de carga, verificando resistência, segurança estrutural e conformidade legal.",
        pratica:
            "O engenheiro realiza inspeção visual e dimensional dos equipamentos de movimentação, aplica testes de carga conforme especificação do fabricante, verifica cabos de aço, trilhos, freios e limitadores, e emite laudo técnico com ART indicando conformidade ou ações corretivas necessárias.",
    },
    {
        title: "Auditoria e Adequação NR-12",
        description:
            "Análise de risco e adequação de máquinas e equipamentos conforme a NR-12, que define requisitos técnicos e medidas de proteção para prevenir acidentes e doenças ocupacionais. Inclui instalação de dispositivos de proteção (barreiras mecânicas, cortinas de luz, relés de segurança) e emissão de parecer de conformidade.",
        pratica:
            "É feito o inventário de todas as máquinas da planta, seguido de apreciação de risco individual. Para cada equipamento, o engenheiro identifica os pontos de risco, especifica proteções fixas e móveis, dimensiona dispositivos de segurança elétrica e elabora o dossiê técnico com memorial descritivo e ART.",
    },
    {
        title: "Inspeção e Adequação NR-13",
        description:
            "Inspeção periódica (interna, externa e de segurança) de caldeiras, vasos de pressão, tubulações interligadas e tanques metálicos de armazenamento, conforme NR-13. Visa garantir a integridade estrutural dos equipamentos pressurizados, prevenindo rupturas e explosões.",
        pratica:
            "O profissional habilitado realiza medição de espessura por ultrassom, inspeção visual interna e externa, teste hidrostático quando aplicável, verificação de válvulas de segurança e análise documental do prontuário do equipamento. O resultado é um relatório de inspeção com recomendações e prazo para a próxima inspeção.",
    },
    {
        title: "Vistorias para Alvarás",
        description:
            "Inspeção técnica realizada por engenheiro habilitado para atestar que um imóvel ou estabelecimento atende aos requisitos de segurança e conformidade exigidos para emissão de alvarás de funcionamento junto à prefeitura e Corpo de Bombeiros.",
        pratica:
            "O engenheiro visita o estabelecimento, verifica condições estruturais, instalações elétricas e hidráulicas, saídas de emergência, sinalização e sistemas de combate a incêndio. Emite laudo técnico acompanhado de ART, que é protocolado junto ao órgão competente para liberação do alvará.",
    },
    {
        title: "Laudos de Engenharia",
        description:
            "Documento técnico emitido por engenheiro habilitado, após inspeção ou análise técnica, com o objetivo de diagnosticar condições, apontar falhas e recomendar ações corretivas sobre edificações, equipamentos ou instalações. Possui validade legal e deve ser acompanhado de ART.",
        pratica:
            "A partir de visita técnica, o engenheiro coleta dados por meio de inspeção visual, ensaios não destrutivos e medições instrumentais. Analisa os resultados, compara com normas técnicas aplicáveis e redige o laudo com diagnóstico, fotos, croquis e recomendações de intervenção, com emissão de ART.",
    },
    {
        title: "Laudos de Insalubridade LTCAT NR-15",
        description:
            "Laudo técnico que avalia a exposição de trabalhadores a agentes nocivos (ruído, calor, agentes químicos, vibração) acima dos limites de tolerância definidos pela NR-15. O LTCAT documenta as condições ambientais de trabalho para fins previdenciários.",
        pratica:
            "São realizadas medições ambientais com equipamentos calibrados (decibelímetro, dosímetro, termômetro de globo, bomba de amostragem) nos postos de trabalho. Os resultados são comparados com os limites de tolerância da NR-15 e o laudo classifica o grau de insalubridade, indicando necessidade de EPIs ou mudanças no processo.",
    },
    {
        title: "Laudos de Periculosidade NR-16",
        description:
            "Laudo técnico que caracteriza atividades perigosas envolvendo inflamáveis, explosivos, energia elétrica, radiações ionizantes ou segurança patrimonial, conforme NR-16. A caracterização gera direito ao adicional de 30% sobre o salário-base do trabalhador.",
        pratica:
            "O engenheiro de segurança avalia as atividades e o ambiente de trabalho, identifica a presença de agentes periculosos e suas áreas de risco, analisa o tempo de exposição e enquadra ou não a atividade nos anexos da NR-16, emitindo laudo conclusivo com fundamentação técnica e legal.",
    },
    {
        title: "Laudos de Ergonomia NR-17",
        description:
            "Análise Ergonômica do Trabalho (AET) conforme NR-17, avaliando condições de trabalho quanto a mobiliário, postura, movimentação de cargas, iluminação e conforto térmico. Identifica riscos ergonômicos e propõe adequações para reduzir lesões musculoesqueléticas.",
        pratica:
            "A equipe técnica observa e registra as atividades dos trabalhadores, aplica questionários, realiza medições de iluminância, temperatura e ruído, e analisa posturas com ferramentas como RULA ou OWAS. O relatório final apresenta os riscos identificados, classifica a criticidade e propõe melhorias no layout e nos postos de trabalho.",
    },
];

export default function InspecoesDetailScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Inspeções e Vistorias" />
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
