import Button from "../button/button";
import styles from "./franchiseIndustry.module.css";
const FranchiseIndustry = () => {
  return (
    <section className={`py-6 md:py-12 ${styles.franchiseIndustry}`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left">
          <div className={`${styles.industryLeft}`}>
            <h3 className="font-normal">Franchise Industry at a Glance</h3>
          </div>
          <div className={`${styles.industryRight}`}>
            <p className="pb-4 font-medium">
              Entrepreneurs today wish to replicate a successful business model,
              use brand recognition and get thorough training to skyrocket
              towards growth. Franchise business is one of the most attractive
              entrepreneurial prospects in contemporary times. It is booming in
              India, 2nd largest in the world and growing at over 15% annually.
            </p>
            <p className="pb-4 font-bold">
              Indian franchise market is expected to reach $150 billion in five
              years.
            </p>
            <p className="pb-4 font-medium">
              Franchoice World is here to help you discover and nurture your
              ideal franchise brand for growth.
            </p>
            <Button variant="highlighted">Know More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseIndustry;
