import { IconSize, IconSizeMap } from "@/types/icon-size";

export const getIconSize = (sizeString: IconSize) => {
  const iconButtonMap: IconSizeMap = {
    'sm': 8,
    'md': 10,
    'lg': 16,
  };

  const faIconSizeMap: IconSizeMap = {
    'sm': 12,
    'md': 20,
    'lg': 32,
  }

  const chakraIconSizeMap: IconSizeMap = {
    'sm': 2,
    'md': 4,
    'lg': 7,
  }

  return {
    iconButtonSize: iconButtonMap[sizeString],
    faIconSize: faIconSizeMap[sizeString],
    chakraIconSize: chakraIconSizeMap[sizeString],
  };
}
