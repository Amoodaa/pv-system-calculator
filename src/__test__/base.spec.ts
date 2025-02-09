describe("Basic creation of PV modules", () => {
  test.todo("Create a single PV, with a identifier, can be number or string");
  test.todo("Create a single PV, with I=1A, V=40v");
  test.todo("Create a single PV, with I=10.96A, V=45v");
  test.todo("Create a single PV, with I=10A, V=36.6v");

  describe("Modules support useful properties", () => {
    test.todo(
      "PV.toString method to print it in a single line, not serialized json"
    );
    test.todo("I: gets the module's current I in Amperes 'A'");
    test.todo("V: gets the module's voltage V in Volts 'V'");
    test.todo(
      "P: gets the module's Pmax which is total power in Watts 'W' (P = I * V) (both values @ max)"
    );
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
  test.todo("Create Series of 3 PV modules");
  test.todo(
    "Create Series of 3 PV modules, where their collective V is a sum of V of submodules"
  );
  test.todo(
    "Create Series of 3 PV modules, where their collective I is a min of I of submodules"
  );
  test.todo(
    "Create Series of 3 PV modules where their Pmax is calculated accordingly"
  );
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
