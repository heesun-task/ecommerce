import { create } from 'zustand';

type NavbarVariant = 'default' | 'float';

interface NavbarStore {
  variant: NavbarVariant;
  setVariant: (variant: NavbarVariant) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  variant: 'default',
  setVariant: (variant) => set({ variant }),
}));

export const useNavbarVariant = () => {
  const { variant, setVariant } = useNavbarStore();
  return { variant, setVariant };
};