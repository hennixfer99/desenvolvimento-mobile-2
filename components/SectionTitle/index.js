import { Text, StyleSheet } from 'react-native';
import { GlobalColors } from '../../constants/colors';

export default function SectionTitle({ text, style }) {
  return <Text style={[styles.title, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: GlobalColors.PRIMARY,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
