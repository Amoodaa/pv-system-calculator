import { PV } from "./PV";

let i = 0;

export class PVSeries extends PV {
  readonly modules: PV[];

  static getOrderedModuleName() {
    return `PVSeries ${++i}`;
  }

  private static voltageSeries(modules: PV[]) {
    return modules.reduce((volts, module) => {
      return volts + module.voltage;
    }, 0);
  }

  private static currentSeries(modules: PV[]) {
    return modules.reduce((amperes, module) => {
      return Math.min(amperes, module.current);
    }, modules[0].current);
  }

  constructor(modules: PV[], name = PVSeries.getOrderedModuleName()) {
    super(
      PVSeries.voltageSeries(modules),
      PVSeries.currentSeries(modules),
      name
    );
    this.modules = modules;
  }

  // to Strings
  get [Symbol.toStringTag]() {
    return this._toString();
  }

  public toString = this._toString;

  // this exists to help with typing and to allow for overriding
  private super_toString = super._toString;

  override _toString({
    modules = false,
    ...superArgs
  }: Parameters<typeof this.super_toString>[0] & { modules?: boolean } = {}) {
    const baseStr = this.super_toString(superArgs);
    return modules
      ? `${baseStr} [${this.modules
          .map((m) => m.toString(superArgs))
          .filter(Boolean)
          .join(", ")}]`
      : baseStr;
  }
}
