// useFitText.js
import { useEffect, useRef, useState } from 'react';

export const useFitText = (maxHeight, minFontSize = 16, maxFontSize = 35) => {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const resize = () => {
      const element = ref.current;
      if (!element) return;

      let currentFont = maxFontSize;
      element.style.fontSize = `${currentFont}px`;

      while (element.scrollHeight > maxHeight && currentFont > minFontSize) {
        currentFont -= 1;
        element.style.fontSize = `${currentFont}px`;
      }

      setFontSize(currentFont);
    };

    resize();
  }, [maxHeight, minFontSize, maxFontSize]);

  return [ref, fontSize];
};
