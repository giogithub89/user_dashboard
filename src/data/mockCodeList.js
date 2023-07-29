const array = [10, 64, 60, 14, 16, 3];

const tot = 167;

const foo = (num) => {
  return (num / tot) * 100;
};

export const mockAgeList = [
  { age: "18-24", count: Math.round(foo(10)) },
  { age: "25-34", count: Math.round(foo(64)) },
  { age: "35-44", count: Math.round(foo(60)) },
  { age: "45-54", count: Math.round(foo(14)) },
  { age: "55-65", count: Math.round(foo(16)) },
  { age: "+66", count: Math.round(foo(3)) },
];

export const mockCityList = [
  { age: "18-24", count: Math.round(foo(10)) },
  { age: "25-34", count: Math.round(foo(64)) },
  { age: "35-44", count: Math.round(foo(60)) },
  { age: "45-54", count: Math.round(foo(14)) },
  { age: "55-65", count: Math.round(foo(16)) },
  { age: "+66", count: Math.round(foo(3)) },
];
