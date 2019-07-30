interface lerpFunc {
  (start: string, end: string, t: number): string | undefined;
}

interface lerpFunc {
  (colors: string[], t: number): string | undefined;
}

type Partial = (t: number) => string | undefined;

interface lerpFunc {
  (colors: string[]): Partial;
}

export default lerpFunc;
