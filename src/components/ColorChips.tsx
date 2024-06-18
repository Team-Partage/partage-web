import { ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { colors, customColors } from '@/utils/colors';
import { Check } from 'lucide-react';

type Size =
  | 'size-[60px]'
  | 'size-[70px]'
  | 'size-[80px]'
  | 'size-[84px]'
  | string;

type Props = {
  size: Size;
  selectedSize: Size;
  count: number;
  onColorSelect: (color: string) => void;
  children: ReactNode;
};

const ColorChips = ({ size, selectedSize, count, onColorSelect, children }: Props) => {
  // TODO zustand 유저정보
  const myColor = '#00FFFF';

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const chips = Object.keys(colors).slice(0, count);

  useEffect(() => {
    const initialColorMain = Object.keys(customColors.main).find(
      (key) => customColors.main[key] === myColor,
    );
    const initialColorSub = Object.keys(customColors.sub).find(
      (key) => customColors.sub[key] === myColor,
    );
    const initialColorKey = initialColorMain || initialColorSub;

    if (initialColorKey) {
      setSelectedColor(initialColorKey);
    }
  }, [myColor]);

  const handleClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(customColors.main[color] || customColors.sub[color]);
  };

  return (
    <>
      <div className="mb-[10px] mt-[32px] text-neutral-100 base-regular">{children}</div>
      <div className="flex w-full items-center justify-between">
        {chips.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(color)}
            className={cn(
              colors[color],
              'rounded-lg flex items-center justify-center cursor-pointer',
              selectedColor === color ? selectedSize : size,
            )}
          >
            {selectedColor === color && <Check />}
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorChips;