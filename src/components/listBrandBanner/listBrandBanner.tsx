import Image from "next/image";
import styles from "./listbrandbanner.module.css";
import CountryDropdown from "../countryDropdown/countryDropdown";
import { useState } from "react";
import Button from "../button/button";
const countries = [
  { code: "+91", name: "India", flag: "https://flagcdn.com/in.svg" },
  { code: "+1", name: "Canada", flag: "https://flagcdn.com/ca.svg" },
  { code: "+2", name: "UK", flag: "https://flagcdn.com/gb.svg" },
  // Add more countries as needed
];
const ListBrandBanner = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0].code
  );
  const handleListBrand = (e: any) => {
    e.preventDefault();
    console.log("BrandList");
  };
  return (
    <section className="py-8">
      <div className="container">
        <div className={`grid md:grid-cols-3 ${styles.listBrandBanner}`}>
          <div className="hidden md:block relative">
            <Image
              src={"/womenBrandBanner.png"}
              width={250}
              height={250}
              alt="List Brand"
              className={`absolute bottom-0 left-0 ${styles.brandWomenImg}`}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <div className="w-5/6 mx-auto">
              <h3 className={styles.brandTitle}>List Your Brand</h3>
              <form
                className={`flex gap-3 flex-col md:flex-row`}
                onClick={handleListBrand}
              >
                <CountryDropdown
                  countries={countries}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  placeholder="Select a country"
                />
                <input
                  type="number"
                  placeholder="00000 00000"
                  className={`rounded-md w-full font-medium text-lg ${styles.InputStyle}`}
                  pattern="[0-9](5) [0-9](5)"
                  maxLength={11}
                />
                <Button variant="highlighted">
                  <div className="flex whitespace-nowrap gap-2 items-center">
                    Start Now{" "}
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListBrandBanner;
