import { View, Text, FlatList, StyleSheet } from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import TestimonialCard from '../../components/TestimonialCard';
import { GlobalColors } from '../../constants/colors';

const TESTIMONIALS = [
  {
    id: '1',
    quote: 'Fui muito bem atendido na Imperial Engenharia! Profissionais qualificados, executam bem o trabalho. Gostei da experiência. Parabéns a equipe de engenheiros que compõem o quadro da empresa.',
    name: 'Wilson Rezende - Uberaba/MG',
  },
  {
    id: '2',
    quote: 'Solicitei para limpeza de coifa da minha petiscaria, o serviço entregue foi de excelência, tirou todas as minhas dúvidas e ainda foi explicado a importância do PMOC, atendimento super rápido na região de Marília, parabéns aos profissionais.',
    name: 'Alexandre Santos - Marília/SP',
  },
  {
    id: '3',
    quote: 'Dentre as várias que pesquisei, essa foi a mais Honesta, assim atendendo a tudo que lhes foram pedidos. Qualidade impecável, ouve as vontades do consumidor e sempre disposta a solucionar as dúvidas. O sucesso de vocês é garantido. Equipe toda de Parabéns!',
    name: 'Cristiane Oliveira - Bertioga/SP',
  },
];

export default function DepoimentosScreen() {
  return (
    <View style={s.container}>
      <SectionTitle text="Depoimentos - Google Negócios" />
      <FlatList
        data={TESTIMONIALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TestimonialCard quote={item.quote} name={item.name} />
        )}
        scrollEnabled={false}
      />
      <View style={s.ceoSection}>
        <Text style={s.ceoTitle}>Palavra de nossa CEO</Text>
        <Text style={s.ceoParagraph}>
          A IMPERIAL ENGENHARIA possui soluções especializadas para atendimento às normas técnicas e/ou regulamentadoras, através de vistoria, inspeção, regularização e laudos de engenharia. PMOC para sistemas de exaustão para cozinhas e ar condicionado.
        </Text>
        <Text style={s.ceoParagraph}>
          Além disso, possui capacitação para conduzir auditorias em NR-11 em máquinas industriais e/ou pesadas, assim como sistemas transportadores; e NR-12 para sistemas e equipamentos, a fim de indicar e executar as adequações necessárias.
        </Text>
        <Text style={s.ceoParagraph}>
          Também oferece projetos de PPCI para obtenção de AVCB/CLCB, além de emitir laudos de segurança do trabalho em conformidade com as NR's. Somos certificados pelo CREA-CONFEA.
        </Text>
        <Text style={s.ceoParagraph}>
          Entre em contato conosco e conheça um pouco mais como podemos lhe ajudar!
        </Text>
        <View style={s.ceoSignature}>
          <Text style={s.ceoName}>Andréa Pinheiro</Text>
          <Text style={s.ceoRole}>Diretora Técnica da Imperial Engenharia</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.WHITE,
    padding: 20,
  },
  ceoSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: GlobalColors.BORDER,
  },
  ceoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GlobalColors.TEXT_DARK,
    marginBottom: 15,
  },
  ceoParagraph: {
    fontSize: 14,
    color: GlobalColors.TEXT_MEDIUM,
    lineHeight: 22,
    marginBottom: 12,
  },
  ceoSignature: {
    alignItems: 'flex-end',
    marginTop: 15,
  },
  ceoName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GlobalColors.PRIMARY,
  },
  ceoRole: {
    fontSize: 12,
    color: GlobalColors.TEXT_LIGHT,
    fontStyle: 'italic',
  },
});
