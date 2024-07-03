"use client";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import styles from "./listBrandBanner.module.css";
import Title from "@/components/title/title";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/select/dropdown";
import TextArea from "@/components/Fields/TextArea";

function SecondStep() {
  const router = useRouter();

  const props = {
    imgUrl: "/listStep/listYourBrand.png",
    imgAlt: "Banner image",
    bannerTitle: "Welcome to the World of Franchising",
  };

  const Industry = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [formData, setFormData] = useState({
    brandName: "",
    selectedIndustry: "",
    subCategory: "",
    serviceProduct: "",
    yearFounded: "",
    locationHeadquarters: "",
    outlets: "",
    description: "",
    sellingProposition: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (formSubmitData: FormData) => {
    const formObject = Object.fromEntries(formSubmitData.entries());
    const mergedData = {
      ...formObject,
      ...formData,
    };

    console.log("Form submitted:", mergedData);
    // router.push("/list-your-brand/step_2");
  };

  const handleSelectChange = (name: string | undefined, value: string) => {
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      // Handle the case where name is not provided
    }
  };

  const handleBackButton = () => {
    console.log("Back");

    router.push("/list-your-brand/step_1");
  };

  return (
    <>
      <section
        id="listBrandBanner"
        className={`relative ${styles.listBannerSection}`}
      >
        <Image
          src={props.imgUrl}
          alt={props.imgAlt}
          className={styles.listBannerImage}
          width={2000}
          height={500}
        />
        <div className="container absolute top-9 left-0 right-0 transform md:translate-y-[-50%] md:top-1/2">
          <h3
            className={`pt-1 md:pt-0 w-7/12 font-bold ${styles.listBannerTitle}`}
          >
            Hello
          </h3>
        </div>
      </section>
      <section className={`relative ${styles.halfBanner}`}>
        <div className="container w-full md:w-3/4">
          <div
            className={`bg-white gap-3 p-4  md:py-10 md:px-5 ${styles.halfBannerContent}`}
          >
            <div className={`${styles.formPart} px-3`}>
              <Title
                title="Showcase Your Brand's Identity"
                desc="Essential Details Required"
              />
              <form action={handleSubmit} className="mt-16 ">
                <div className="w-full mb-6 md:mb-0">
                  <InputField
                    id="grid-brand-name"
                    name="brandName"
                    type="text"
                    label="Brand Name"
                    value={formData.brandName}
                    onChange={handleChange}
                    required={true}
                    className=" block w-full border border-[#73727366] rounded-lg py-2 px-4 mb-3  focus:bg-white focus:border-[#73727366]"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 mb-2 md:grid-cols-2">
                  <div>
                    <Dropdown
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.subCategory ? "justify-between" : "justify-end"
                      }`}
                      name="subCategory"
                      options={Industry}
                      value={formData.subCategory}
                      label="Sub-Category"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div>
                    <Dropdown
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.selectedIndustry ? "justify-between" : "justify-end"
                      }`}
                      name="selectedIndustry"
                      options={Industry}
                      value={formData.selectedIndustry}
                      label="Industry"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div>
                    <Dropdown
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.serviceProduct ? "justify-between" : "justify-end"
                      }`}
                      name="serviceProduct"
                      options={Industry}
                      value={formData.serviceProduct}
                      label="Service/Product"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div>
                    <Dropdown
                      name="yearFounded"
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.yearFounded ? "justify-between" : "justify-end"
                      }`}
                      options={Industry}
                      value={formData.yearFounded}
                      label="Year Founded"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div>
                    <Dropdown
                      name="locationHeadquarters"
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.locationHeadquarters ? "justify-between" : "justify-end"
                      }`}
                      options={Industry}
                      value={formData.locationHeadquarters}
                      label="Location of Headquarters"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                  <div>
                    <Dropdown
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                        formData.outlets ? "justify-between" : "justify-end"
                      }`}
                      name="outlets"
                      options={Industry}
                      value={formData.outlets}
                      label="Current Number of Locations/Outlets"
                      required
                      onChange={handleSelectChange}
                    />
                  </div>
                </div>
                <div>
                  <TextArea
                    id="description"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required={true}
                    rows={4}
                    className=" block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 mb-3  focus:bg-white focus:border-[#73727366]"
                  />
                </div>
                <div>
                  <TextArea
                    id="description"
                    name="sellingProposition"
                    label="Unique Selling Proposition (USP)"
                    value={formData.sellingProposition}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required={true}
                    rows={4}
                    className=" block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 mb-3  focus:bg-white focus:border-[#73727366]"
                  />
                </div>
                {/* <div>
                  <InputField
                    id="grid-website-url"
                    name="websiteUrl"
                    type="url"
                    label="WebSite URL"
                    value={formData.websiteUrl}
                    required={true}
                    onChange={handleChange}
                    className=" block w-full border border-[#73727366] rounded-lg py-2 px-4 mb-3  focus:bg-white focus:border-[#73727366]"
                  />
                </div> */}
                <div className="flex justify-between">
                  <Button
                    className="border border-customBorder rounded-lg"
                    onClick={handleBackButton}
                  >
                    <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.48872 0.547607C14.4059 0.547607 18.4761 4.54785 18.4761 9.46502C18.4761 14.3822 14.4059 18.4524 9.48872 18.4524C4.57156 18.4524 0.571314 14.3822 0.571314 9.46502C0.571314 4.54785 4.57156 0.547607 9.48872 0.547607ZM6.27423 9.92236L11.0425 14.6907C11.2721 14.9203 11.6443 14.9203 11.8739 14.6907L12.526 14.0385C12.7556 13.8089 12.7556 13.4368 12.526 13.2072L9.24225 9.92341C8.98973 9.67089 8.99145 9.2609 9.24613 9.01054L12.519 5.79276C12.7519 5.56377 12.7534 5.18886 12.5225 4.95791L11.8713 4.3067C11.6427 4.07813 11.2725 4.07698 11.0426 4.30411L6.27706 9.01051C6.02335 9.26107 6.02209 9.67022 6.27423 9.92236Z"
                          fill="#737273"
                          fill-opacity="0.3"
                        />
                      </svg>{" "}
                      Back
                    </div>
                  </Button>
                  <Button
                    variant="highlighted"
                    type="submit"
                    className="border rounded-lg"
                  >
                    <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                      Next{" "}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SecondStep;
