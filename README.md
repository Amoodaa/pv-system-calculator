# PV System Calculator/Simulator

For usage when u have mismatching or damaged panels and don't have the means to fix the system properly!

For now its a code only project, but can become a UI too.

Core functionality first:

- Create and calculate submodules V (voltage), I (amperes) and P (wattage)
- Pretty print (Config and metrics)
- Function to optimize system from arrays of PVs by losing the least when configuring in a specific way
  - Allows for input of lowest viable VDC to allow supporting of high minimum operating voltage solar inverters
