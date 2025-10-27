import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { color } from '../theme/color';
import RText from './RText';

export const RButton = ({buttonStyle,buttonText,onPress,textStyle}) => (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <RText content={buttonText} style={textStyle}  />
    </TouchableOpacity>
);

export const RButtonPlus = ({buttonStyle,buttonText,onPress,textStyle}) => (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <AntDesign name="pluscircle" size={24} color={color.prime} style={{paddingRight:10}}/>
        <RText content={buttonText} style={textStyle}  />
    </TouchableOpacity>
);


