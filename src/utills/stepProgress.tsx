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

export const updateInvestorStepProgress = (step: string) => {
  let steps = JSON.parse(localStorage.getItem("InvestorcompletedSteps") || "[]");
  if (!steps.includes(step)) {
    steps.push(step);
    localStorage.setItem("InvestorcompletedSteps", JSON.stringify(steps));
  }
};

export const getInvestorStepProgress = () => {
  return (
    JSON.parse(localStorage.getItem("InvestorcompletedSteps") || "[]")
  );
};
