import { FC, useId } from "react";
import { useKnob } from "./Knobs";

interface SelectProps {
  name: string;
  values: string[];
  label?: string;
  initialValue?: string;
}

export const Select: FC<SelectProps> = ({
  name,
  label,
  values,
  initialValue,
}) => {
  const id = useId();
  const [current, setKnob] = useKnob(name, initialValue);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label || name}
      </label>
      <select
        id={id}
        onChange={(e) => setKnob(e.target.value)}
        value={current}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {values.map((value) => (
          <option selected={value === current} key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
