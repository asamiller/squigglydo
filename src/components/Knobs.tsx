import prand from "pure-rand";
import { FC, useCallback, useEffect } from "react";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Select } from "./Select";
import { Slider } from "./Slider";

enum KnobTypes {
  select = "select",
  slider = "slider",
  random = "random",
}

interface SelectKnob {
  name: string;
  type: KnobTypes;
  value: string;
  values: string[];
}

interface SliderKnob {
  name: string;
  type: KnobTypes;
  value: number;
  min: number;
  max: number;
  steps?: number;
}

type Knob = SelectKnob | SliderKnob;
interface KnobsState {
  knobs: {
    [key: string]: Knob;
  };
  setKnobValue: (name: string, value: string | number) => void;
  addKnob: (knob: Knob) => void;
}

const getUrlSearch = () => {
  return window.location.search.slice(1);
};

const persistentStorage: StateStorage = {
  getItem: (key): string => {
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      const storedValue = searchParams.get(key);
      return JSON.parse(storedValue);
    }
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.set(key, JSON.stringify(newValue));
    window.history.replaceState(null, null, `?${searchParams.toString()}`);
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
};

const useKnobsStore = create<KnobsState>()(
  persist(
    immer<KnobsState>((set) => ({
      knobs: {},
      setKnobValue: (name, value) => {
        set((state) => {
          state.knobs[name].value = value;
        });
      },
      addKnob: (knob: Knob) => {
        set((state) => {
          state.knobs[knob.name] = knob;
        });
      },
    })),
    {
      name: "knobs-storage",
      storage: createJSONStorage(() => persistentStorage),
      partialize: (state) => ({ knobs: state.knobs }),
    }
  )
);

interface KnobsProps {}
export const Knobs: FC<KnobsProps> = ({}) => {
  const knobs = useKnobsStore((state) => state.knobs);
  const setKnobValue = useKnobsStore((state) => state.setKnobValue);

  const download = useCallback(() => {
    const dataURL =
      "data:image/svg+xml," +
      encodeURIComponent(document.getElementById("sketch").outerHTML);
    const dl = document.createElement("a");
    dl.setAttribute("href", dataURL);
    dl.setAttribute("download", "sketch.svg");
    dl.click();
  }, []);

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
      {Object.values(knobs).map((knob) => {
        switch (knob.type) {
          case KnobTypes.select:
            const selectKnob = knob as SelectKnob;
            return (
              <Select
                name={selectKnob.name}
                value={selectKnob.value}
                values={selectKnob.values}
                onChange={(value) => setKnobValue(selectKnob.name, value)}
                key={selectKnob.name}
              />
            );
          case KnobTypes.slider:
            const sliderKnob = knob as SliderKnob;
            return (
              <Slider
                name={sliderKnob.name}
                value={sliderKnob.value}
                min={sliderKnob.min}
                max={sliderKnob.max}
                steps={sliderKnob.steps}
                onChange={(value) => setKnobValue(sliderKnob.name, value)}
                key={sliderKnob.name}
              />
            );

          case KnobTypes.random:
            const randomKnob = knob as SliderKnob;
            return (
              <Slider
                name={randomKnob.name}
                value={randomKnob.value}
                min={1}
                max={1000}
                steps={1}
                onChange={(value) => setKnobValue(randomKnob.name, value)}
                key={randomKnob.name}
              />
            );
        }
      })}

      <button onClick={download}>Download</button>
    </div>
  );
};

export function useRandomKnob(name: string): () => number {
  const knob = useKnobsStore((state) => state.knobs[name]);
  const addKnob = useKnobsStore((state) => state.addKnob);

  useEffect(() => {
    if (knob === undefined) {
      addKnob({
        name,
        type: KnobTypes.slider,
        value: 1,
        min: 1,
        max: 1000,
        steps: 1,
      });
    }
  }, []);

  const rng = prand.xoroshiro128plus((knob?.value as number) ?? 1);
  return () => (rng.unsafeNext() >>> 0) / 0x100000000;
}

interface SelectKnobProps {
  name: string;
  values: string[];
  initialValue?: string;
}

export function useSelectKnob<T>({
  name,
  values,
  initialValue,
}: SelectKnobProps): T {
  const knob = useKnobsStore((state) => state.knobs[name]);
  const addKnob = useKnobsStore((state) => state.addKnob);

  useEffect(() => {
    console.log("useEffect", name, values, initialValue);

    if (knob === undefined) {
      addKnob({
        name,
        type: KnobTypes.select,
        value: initialValue ?? values[0],
        values,
      });
    }
  }, []);

  return (knob?.value ?? initialValue ?? values[0]) as T;
}

interface SliderKnobProps {
  name: string;
  min: number;
  max: number;
  initialValue?: number;
  steps?: number;
}
export function useSliderKnob({
  name,
  min,
  max,
  initialValue,
  steps,
}: SliderKnobProps): number {
  const knob = useKnobsStore((state) => state.knobs[name]);
  const addKnob = useKnobsStore((state) => state.addKnob);

  useEffect(() => {
    if (knob === undefined) {
      addKnob({
        name,
        type: KnobTypes.slider,
        value: initialValue ?? min,
        min,
        max,
        steps,
      });
    }
  }, []);

  return (knob?.value as number) ?? initialValue ?? min;
}

export function useKnobValue<T>(name: string): T {
  const knob = useKnobsStore((state) => state.knobs[name]);
  return knob?.value as T;
}
