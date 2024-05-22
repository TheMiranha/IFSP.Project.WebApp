import { ChevronsUp, Shield, Sword, WandSparkles } from "lucide-react"

export const attributes = [
  {
    id: 'speed',
    label: 'velocidade',
    Icon: ChevronsUp
  },
  {
    id: 'strength',
    label: 'força',
    Icon: Sword
  },
  {
    id: 'resistence',
    label: 'resistência',
    Icon: Shield
  },
  {
    id: 'mana',
    label: 'mana',
    Icon: WandSparkles
  }
] as const

export const getConstantAttribute = (attributeId: typeof attributes[number]['id']) => attributes.find(attribute => attribute.id === attributeId) || attributes[0]