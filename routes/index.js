import { ScrollView, View } from 'react-native';
import HomeScreen from '../pages/HomeScreen';
import QuemSomosScreen from '../pages/QuemSomosScreen';
import SolucoesScreen from '../pages/SolucoesScreen';
import ServicosScreen from '../pages/ServicosScreen';
import PrincipiosScreen from '../pages/PrincipiosScreen';
import DepoimentosScreen from '../pages/DepoimentosScreen';
import ClientesScreen from '../pages/ClientesScreen';
import ContatoScreen from '../pages/ContatoScreen';

export default function Routes({ scrollRef, onSectionLayout, scrollToSection }) {
  const handleLayout = (key) => (e) => {
    onSectionLayout(key, e.nativeEvent.layout.y);
  };

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View onLayout={handleLayout('Home')}>
        <HomeScreen onContactPress={() => scrollToSection('Contato')} />
      </View>
      <View onLayout={handleLayout('QuemSomos')}>
        <QuemSomosScreen />
      </View>
      <View onLayout={handleLayout('Solucoes')}>
        <SolucoesScreen />
      </View>
      <View onLayout={handleLayout('Principios')}>
        <PrincipiosScreen />
      </View>
      <View onLayout={handleLayout('Servicos')}>
        <ServicosScreen />
      </View>
      <View onLayout={handleLayout('Depoimentos')}>
        <DepoimentosScreen />
      </View>
      <View onLayout={handleLayout('Clientes')}>
        <ClientesScreen />
      </View>
      <View onLayout={handleLayout('Contato')}>
        <ContatoScreen />
      </View>
    </ScrollView>
  );
}
