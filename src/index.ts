import { PVSeries } from "./PVSeries";
import { PV } from "./PV";
import { PVParallel } from "./PVParallel";

const GoodPV = new PV(40.5, 11.12);
const BrokenPV = new PV(40.5, 6);

const s1 = new PVSeries([GoodPV, GoodPV]);
const s2 = new PVSeries([GoodPV, BrokenPV]);
const p1 = new PVParallel([s1, s2], "2 Series x2 Parallel");
console.log(p1.toString({ w: true }));

const s3 = new PVSeries(
  [GoodPV, GoodPV, GoodPV, BrokenPV],
  "4 Series but 1 is bad"
);
console.log(s3.toString({ w: true }));
const seriesWihoutBroken = new PVSeries(
  [GoodPV, GoodPV, GoodPV],
  "3 Series removing the bad"
);
console.log(seriesWihoutBroken.toString({ w: true }));

const s4 = new PVParallel([GoodPV, GoodPV, GoodPV, BrokenPV], "4 Parallel");
console.log(s4.toString({ w: true }));
