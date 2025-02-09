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
    expect.hasAssertions();
  });
  test("Create Series of 3 PV modules, where their collective I is a min of I of submodules", () => {
    expect.hasAssertions();
  });
  test("Create Series of 3 PV modules where their Pmax is calculated accordingly", () => {
    expect.hasAssertions();
  });
  describe("Series modules support all same properties of base modules", () => {
    test.todo("toString");
    test.todo("I");
    test.todo("V");
    test.todo("P");
  });
});

describe("Basic creation of PV Parallel module", () => {
  test.todo("Create Parallel of 3 PV modules");
  test.todo(
    "Create Parallel of 3 PV modules, where their collective V is a min of V of submodules"
  );
  test.todo(
    "Create Parallel of 3 PV modules, where their collective I is a sum of I of submodules"
  );
  test.todo(
    "Create Parallel of 3 PV modules where their Pmax is calculated accordingly"
  );
  describe("Parallel modules support all same properties of base modules", () => {
    test.todo("toString");
    test.todo("I");
    test.todo("V");
    test.todo("P");
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
