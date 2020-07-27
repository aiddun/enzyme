export const getSubstrings = (s) => {
  const tokens = [];
  for (let i = 1; i < s.length; ++i) tokens.push(s.slice(0, i));

  return tokens;
};

export const tokenizeCourseNum = (s) => {
  // Split into department name (w/ no spaces) and course number, and then tokenizing both
  // This assumes all course numbers start with a number
  const firstIntIndex = s.search(/\d/);
  const deptString = s.slice(0, firstIntIndex).replace(" ", "");
  const numString = s.slice(firstIntIndex);

  const result = [...getSubstrings(deptString), ...getSubstrings(numString)];
  return result;
};
