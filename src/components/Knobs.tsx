import { FC, useCallback, useEffect } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PageColors, Pages } from "./Page";
import { Select } from "./Select";
import { Slider } from "./Slider";

interface KnobsState {
  knobs: {
    [key: string]: string | number;
  };
  setKnob: (name: string, value: string | number) => void;
}

const useKnobsStore = create<KnobsState>()(
  devtools(
    persist(
      (set) => ({
        knobs: {},
        setKnob: (name, value) => {
          set((state) => ({
            knobs: {
              ...state.knobs,
              [name]: value,
            },
          }));
        },
      }),
      { name: "knobs-storage" }
    )
  )
);

export function useKnob(
  name: string,
  initialValue?: string | number
): [string | number, (value: string | number) => void] {
  const value: string | number | undefined = useKnobsStore(
    (state) => state.knobs[name]
  );
  const setKnob = useKnobsStore((state) => state.setKnob);

  // If we don't have a value set, set it to the initial value
  useEffect(() => {
    if (value === undefined && initialValue !== undefined) {
      setKnob(name, initialValue);
    }
  }, [name, initialValue, setKnob, value]);

  const setKnobValue = useCallback(
    (newValue: string | number) => {
      // console.log("setKnobValue", name, newValue);
      setKnob(name, newValue);
    },
    [name, setKnob]
  );

  return [value, setKnobValue];
}

interface KnobsProps {}
export const Knobs: FC<KnobsProps> = ({}) => {
  return (
    <div
      style={{
        width: "30%",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: 10,
        right: 10,
        minHeight: 50,
        borderRadius: 5,
      }}
    >
      <Select
        name="Page Type"
        values={Object.values(Pages)}
        initialValue={Pages.landscape11x17}
      />
      <Select
        name="Page Color"
        values={Object.values(PageColors)}
        initialValue={PageColors.white}
      />
      <Slider name="Pen Size" initialValue={2} min={0} max={10} />
    </div>
  );
};
