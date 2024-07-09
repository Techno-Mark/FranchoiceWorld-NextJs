export const updateStepProgress = (step: string) => {
  let steps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
  if (!steps.includes(step)) {
    steps.push(step);
    localStorage.setItem("completedSteps", JSON.stringify(steps));
  }
};

export const getStepProgress = () => {
  return (
    JSON.parse(localStorage.getItem("completedSteps") || "[]")
  );
};
