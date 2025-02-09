let i = 0;
export class PV {
  readonly voltage: number; // in volts
  readonly current: number; // in amperes
  readonly name: string;

  static getOrderedModuleName() {
    return `PV ${++i}`;
  }

  constructor(
    voltage: number,
    current: number,
    name = PV.getOrderedModuleName()
  ) {
    this.voltage = voltage;
    this.current = current;
    this.name = name;
  }

  public get v() {
    return `${this.voltage}v`;
  }

  public get i() {
    return `${this.current}a`;
  }

  public get a() {
    return `${this.current}a`;
  }

  public get w() {
    return `${this.voltage * this.current}w`;
  }

  // to Strings
  get [Symbol.toStringTag]() {
    return this._toString();
  }

  public toString = this._toString;

  private _toString({ name = true, a = false, v = false, w = false } = {}) {
    const order = { name, a, v, w } as const;

    return Object.entries(order)
      .filter(([, enabled]) => enabled)
      .reduce((str, [key], i) => {
        return (
          str +
          // for first spacing
          (i === 0 ? "" : " ") +
          // get remaining keys from index
          this[key as keyof typeof order]
        );
      }, "");
  }
}
