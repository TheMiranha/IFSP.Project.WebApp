import { icons, LucideIcon } from 'lucide-react';

export type Icons = keyof (typeof icons)

type IconProps = {
  name: keyof (typeof icons) | string
  color?: string | undefined
  size?: string | number | undefined
}

const Icon = ({ name, color, size }: IconProps) => {
  // @ts-ignore
  const LucideIcon = (icons[name] as LucideIcon);

  if (!LucideIcon) return false

  return <LucideIcon color={color} size={size} />;
};

export default Icon;