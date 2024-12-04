import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../themes/global';

type TIcon = {
    name: string | any;
    color?: string;
    size?: number;
}

export function Icon({ name, color = colors.black, size = 40 }: TIcon) {
    return (
        <FontAwesome name={name} size={size} color={color} />
    );
}