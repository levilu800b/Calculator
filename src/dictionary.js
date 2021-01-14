import op from "./operations";

export const buttons = [
  [
    { name: "MC" },
    { name: "MR" },
    { name: "M+" },
    { name: "M-" },
    { name: "MS" },
  ],
  [
    { name: "%", func: op.byHundred, trigger: true },
    { name: "CE" },
    { name: "C" },
    { name: "DEL" },
    { name: "÷", func: op.division },
  ],

  [
    { name: 7 },
    { name: 8 },
    { name: 9 },
    { name: "x", func: op.multiplication },
  ],
  [{ name: 4 }, { name: 5 }, { name: 6 }, { name: "-", func: op.subtraction }],
  [{ name: 1 }, { name: 2 }, { name: 3 }, { name: "+", func: op.addition }],
  [
    { name: "+/-", func: op.neg, trigger: true },
    { name: 0 },
    { name: "." },
    { name: "=" },
  ],
];