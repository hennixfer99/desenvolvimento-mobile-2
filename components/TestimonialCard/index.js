import { View, Text, StyleSheet } from 'react-native';
import { GlobalColors } from '../../constants/colors';

export default function TestimonialCard({ quote, name }) {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>"{quote}"</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalColors.CARD_BG,
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: GlobalColors.PRIMARY,
  },
  quote: {
    fontSize: 13,
    color: GlobalColors.TEXT_MEDIUM,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 12,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    color: GlobalColors.ACCENT,
  },
});
