import { FC, useId } from "react";
import { useKnob } from "./Knobs";

interface SliderProps {
  name: string;
  label?: string;
  min: number;
  max: number;
  initialValue?: number;
}

export const Slider: FC<SliderProps> = ({
  name,
  label,
  initialValue,
  min,
  max,
}) => {
  const id = useId();
  const [value, setKnob] = useKnob(name, initialValue);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label || name}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setKnob(parseInt(e.target.value, 10))}
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
      />
    </div>
  );
};
