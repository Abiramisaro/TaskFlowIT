import { StyleSheet, View } from 'react-native';
import { color } from '../theme/color';

const BorderBox = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.border, // or any color
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: color.white,
  },
});

export default BorderBox;
