import Sun from '@/stuff/icons/sun.svg';
import Moon from '@/stuff/icons/moon.svg';
import Search from '@/stuff/icons/search.svg';
import Burger from '@/stuff/icons/burger.svg';

export interface IconProps {
    name: keyof typeof ICONS;
    width?: number;
    height?: number;
    size?: number;
    className?: string;
}

const ICONS = {sun: Sun, moon: Moon, search: Search, burger: Burger};

export default function IconLoader({name, className, width, height, ...rest}: IconProps) {
    const SvgIcon = ICONS[name];
    if(!SvgIcon) return null;

    return (
        <div
            key='raw-svg-container' 
            className={className}
            suppressHydrationWarning={true} 
            style={{width: width, height: height}}
            aria-hidden='true'
            dangerouslySetInnerHTML={{__html: SvgIcon}}
            {...rest}
        />
    );
};