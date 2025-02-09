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
}
