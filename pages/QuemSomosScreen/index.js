import { View, Text, StyleSheet } from 'react-native';
import SectionTitle from '../../components/SectionTitle';
import { GlobalColors } from '../../constants/colors';

export default function QuemSomosScreen() {
  return (
    <View style={s.container}>
      <SectionTitle text="Quem Somos" />
      <Text style={s.paragraph}>
        <Text style={s.highlight}>A IMPERIAL ENGENHARIA</Text> é uma empresa localizada na baixada santista que atende todo o país com serviços de INSPEÇÕES, VISTORIAS, PROJETOS, MANUTENÇÕES, TREINAMENTOS e CONSULTORIAS.
      </Text>
      <Text style={s.paragraph}>
        Nossos profissionais são qualificados em engenharia mecânica e segurança do trabalho, especializados na avaliação criteriosa, baseada em requisitos técnicos e regulatórios, a fim de garantir a segurança operacional e legal de sua empresa!
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.WHITE,
    padding: 25,
  },
  highlight: {
    fontWeight: 'bold',
    color: GlobalColors.PRIMARY,
  },
  paragraph: {
    fontSize: 15,
    color: GlobalColors.TEXT_DARK,
    lineHeight: 24,
    marginBottom: 18,
  },
});
