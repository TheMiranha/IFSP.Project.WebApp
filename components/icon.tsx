import { icons } from 'lucide-react';

export type Icons = keyof (typeof icons)

type IconProps = {
  name: keyof (typeof icons)
  color?: string | undefined
  size?: string | number | undefined
}

const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;