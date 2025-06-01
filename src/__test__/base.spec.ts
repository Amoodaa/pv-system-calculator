import { PVParallel } from "../PVParallel";
import { PV } from "../PV";
import { PVSeries } from "../PVSeries";

describe("Basic creation of PV modules", () => {
  test("Create a single PV, with automatically created identifier", () => {
    const pv1 = new PV(25, 1);

    expect(pv1.name).toBe("PV 1");
  });

  test("Create a single PV, with passed in identifier", () => {
    const pv1 = new PV(25, 1, "PV01");

    expect(pv1.name).toBe("PV01");
  });

  test("Create a single PV, with I=1A, V=40v", () => {
    const pv1 = new PV(40, 1);

    expect(pv1.voltage).toBe(40);
    expect(pv1.current).toBe(1);
  });
  test("Create a single PV, with I=10.96A, V=45v", () => {
    const pv1 = new PV(45, 10.96);

    expect(pv1.voltage).toBe(45);
    expect(pv1.current).toBe(10.96);
  });
  test("Create a single PV, with I=10A, V=36.6v", () => {
    const pv1 = new PV(36.6, 10);

    expect(pv1.voltage).toBe(36.6);
    expect(pv1.current).toBe(10);
  });

  describe("Modules support useful properties", () => {
    test("power: gets the module's power in number", () => {
      const pv = new PV(40, 10);
      expect(pv.power).toBe(400);
    });
    test("i: gets the module's current I in Amperes 'A'", () => {
      const pv = new PV(40, 10);
      expect(pv.i).toBe("10a");
    });

    test("a: gets the module's current I in Amperes 'A'", () => {
      const pv = new PV(40, 10);
      expect(pv.a).toBe("10a");
    });

    test("v: gets the module's voltage V in Volts 'V'", () => {
      const pv = new PV(40, 10);
      expect(pv.v).toBe("40v");
    });

    test("w: gets the module's Pmax which is total power in Watts 'W' (P = I * V) (both values @ max)", () => {
      const pv = new PV(40, 10);
      expect(pv.w).toBe("400w");
    });

    describe("toString: base and extended behavior", () => {
      test("input: `name: true` => default value", () => {
        const pv1 = new PV(40, 1);
        const expectedToStringValue = `${pv1.name}`;
        expect(pv1.toString()).toBe(expectedToStringValue);
        expect(String(pv1)).toBe(expectedToStringValue);
      });

      test("input: `name: false` doesn't return anything", () => {
        const pv1 = new PV(40, 1);
        const expectedToStringValue = ``;
        expect(pv1.toString({ name: false })).toBe(expectedToStringValue);
      });

      test("input: `a: true`", () => {
        const pv1 = new PV(40, 1);
        const expectedToStringValue = `${pv1.name} ${pv1.a}`;
        expect(pv1.toString({ a: true })).toBe(expectedToStringValue);
      });

      test("input: `v: true`", () => {
        const pv1 = new PV(40, 1);
        const expectedToStringValue = `${pv1.name} ${pv1.v}`;
        expect(pv1.toString({ v: true })).toBe(expectedToStringValue);
      });

      test("input: `w: true`", () => {
        const pv1 = new PV(40, 1);
        const expectedToStringValue = `${pv1.name} ${pv1.w}`;
        expect(pv1.toString({ w: true })).toBe(expectedToStringValue);
      });
    });
  });
});

describe("Validation when creating PV modules", () => {
  test.todo("failing: Create a single PV where I<0.5 and V=40v");
  test.todo(
    "failing: Create a single PV where Total P is lower than 100 at Pmax"
  );
  test.todo(
    "allow skip validation of values, using a global flag I_KNOW_WHAT_IM_DOING -- might need to take out of file"
  );
});

describe("Basic creation of PV Series module", () => {
  test("Create Series of 3 PV modules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const series = new PVSeries(modules);

    expect(series.name).toBe("PVSeries 1");
  });

  test("Create Series of 3 PV modules, where their collective V is a sum of V of submodules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const series = new PVSeries(modules);

    expect(series.voltage).toBe(120);
  });

  test("Create Series of 3 PV modules, where their collective I is a min of I of submodules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const series = new PVSeries(modules);

    expect(series.current).toBe(10);
  });

  test("Create Series of 3 PV modules where their Pmax is calculated accordingly", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const series = new PVSeries(modules);

    expect(series.power).toBe(1200);
  });

  describe("Series modules support all same properties of base modules", () => {
    test("modules exist and is accessible", () => {
      const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
      const series = new PVSeries(modules, "PV Series 0001");

      expect(series.modules).toEqual(modules);
    });

    test("toString input: modules: true", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const series = new PVSeries(modules, "PV Series 0001");

      expect(series.toString({ modules: true })).toEqual(
        "PV Series 0001 [PV 1, PV 2, PV 3]"
      );
    });

    test("toString input: modules: true, passes the other super arguments down to the rest of modules", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const series = new PVSeries(modules, "PV Series 0001");

      expect(series.toString({ modules: true, a: true })).toEqual(
        "PV Series 0001 10a [PV 1 10a, PV 2 10a, PV 3 10a]"
      );
      expect(series.toString({ modules: true, v: true })).toEqual(
        "PV Series 0001 120v [PV 1 40v, PV 2 40v, PV 3 40v]"
      );
      expect(series.toString({ modules: true, w: true })).toEqual(
        "PV Series 0001 1200w [PV 1 400w, PV 2 400w, PV 3 400w]"
      );
    });
  });
});

describe("Basic creation of PV Parallel module", () => {
  test("Create Parallel of 3 PV modules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const parallel = new PVParallel(modules);
    expect(parallel.name).toBe("PVParallel 1");
  });
  test("Create Parallel of 3 PV modules, where their collective V is a min of V of submodules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const parallel = new PVParallel(modules);

    expect(parallel.voltage).toBe(40);
  });
  test("Create Parallel of 3 PV modules, where their collective I is a sum of I of submodules", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const parallel = new PVParallel(modules);

    expect(parallel.current).toBe(30);
  });
  test("Create Parallel of 3 PV modules where their Pmax is calculated accordingly", () => {
    const modules = [new PV(40, 10), new PV(40, 10), new PV(40, 10)];
    const parallel = new PVParallel(modules);

    expect(parallel.power).toBe(1200);
  });
  describe("Parallel modules support all same properties of base modules", () => {
    test("toString", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const parallel = new PVParallel(modules, "PV Parallel 0001");

      expect(parallel.toString({ modules: true })).toEqual(
        "PV Parallel 0001 [PV 1, PV 2, PV 3]"
      );
    });
    test("I", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const parallel = new PVParallel(modules, "PV Parallel 0001");

      expect(parallel.toString({ modules: true, a: true })).toEqual(
        "PV Parallel 0001 30a [PV 1 10a, PV 2 10a, PV 3 10a]"
      );
    });
    test("V", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const parallel = new PVParallel(modules, "PV Parallel 0001");

      expect(parallel.toString({ modules: true, v: true })).toEqual(
        "PV Parallel 0001 40v [PV 1 40v, PV 2 40v, PV 3 40v]"
      );
    });
    test("P", () => {
      const modules = [
        new PV(40, 10, "PV 1"),
        new PV(40, 10, "PV 2"),
        new PV(40, 10, "PV 3"),
      ];
      const parallel = new PVParallel(modules, "PV Parallel 0001");

      expect(parallel.toString({ modules: true, w: true })).toEqual(
        "PV Parallel 0001 1200w [PV 1 400w, PV 2 400w, PV 3 400w]"
      );
    });
  });
});

describe("Complicated simulating of multiple intertwined Parallel and Series modules", () => {
  test.todo(
    "Create Parallel of 3 PV series submodules (with each having 3 modules)"
  );
  test.todo("Create Series of 3 PV Parallel submodules");
  test.todo("Create Series of 2 PV Parallel of 2 Series each submodules");
});

describe("Solving for optimized layout of PVs", () => {
  test.todo(
    "Optimize 12 modules into series and parallel (provide top 3 solutions?, allow for removal of modules?)"
  );
});
