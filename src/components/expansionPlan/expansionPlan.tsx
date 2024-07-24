import React from "react";
import Title from "../title/title";
interface PlanDetail {
  planTitle: string;
  planDesc: string;
}
interface ExpansionProps {
  brandName: string;
  plans: PlanDetail[];
}
const ExpansionPlan: React.FC<ExpansionProps> = ({ brandName, plans }) => {
  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <Title title={`${brandName} Expansion Plans`} />
        <div className="flex flex-wrap mt-5">
          {plans.map((plan, index) => (
            <div key={index} className="w-full md:w-1/3 pr-5 mb-6">
              <div className="border-[0.5px] rounded-lg h-full border-[var(--text-color)]">
                <h4 className="py-4 px-5 bg-[var(--third-color)] text-white text-2xl rounded-lg font-bold uppercase">
                  {plan.planTitle}
                </h4>
                <p className="font-medium pl-5 pt-5 pr-10 pb-4">
                  {plan.planDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpansionPlan;
