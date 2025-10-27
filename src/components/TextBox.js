import { TextInput } from 'react-native';

const TextBox = ({placeholder = '', value,style, keyboardType= 'default', onChangeText
}) => (
    <TextInput placeholder={placeholder}
 style={style} value={value} keyboardType={keyboardType}
    onChangeText={onChangeText}  />
);

export default TextBox;
