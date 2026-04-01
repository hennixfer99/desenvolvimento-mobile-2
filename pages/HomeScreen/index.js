import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { GlobalColors } from '../../constants/colors';

const { height } = Dimensions.get('window');

export default function HomeScreen({ onContactPress }) {
  return (
    <View style={s.container}>
      <Image
        source={require('../../assets/images/logo-imperial.png')}
        style={s.logoImage}
      />
      <Text style={s.companyName}>IMPERIAL ENGENHARIA</Text>
      <Text style={s.tagline}>
        Soluções especializadas em Inspeções, Vistorias, Projetos, Manutenções, Treinamentos e Consultorias
      </Text>
      <TouchableOpacity style={s.contactButton} onPress={onContactPress}>
        <Text style={s.contactButtonText}>Entre em Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    minHeight: height - 60,
    backgroundColor: GlobalColors.PRIMARY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: GlobalColors.WHITE,
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: GlobalColors.WHITE,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    opacity: 0.9,
  },
  contactButton: {
    backgroundColor: GlobalColors.ACCENT,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  contactButtonText: {
    color: GlobalColors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
