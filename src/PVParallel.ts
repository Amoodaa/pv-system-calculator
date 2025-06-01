import { PV } from "./PV";

let i = 0;

export class PVParallel extends PV {
  readonly modules: PV[];

  static getOrderedModuleName() {
    return `PVParallel ${++i}`;
  }

  private static voltageParallel(modules: PV[]) {
    return modules.reduce((volts, module) => {
      return Math.min(volts, module.voltage);
    }, modules[0].voltage);
  }

  private static currentParallel(modules: PV[]) {
    return modules.reduce((amperes, module) => {
      return amperes + module.current;
    }, 0);
  }

  constructor(modules: PV[], name = PVParallel.getOrderedModuleName()) {
    super(
      PVParallel.voltageParallel(modules),
      PVParallel.currentParallel(modules),
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
