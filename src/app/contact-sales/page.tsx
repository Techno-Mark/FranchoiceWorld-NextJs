import ContactBanner from "@/components/contactBanner/contactBanner";
import GetInTouch from "@/components/getInTouch/getInTouch";
import React from "react";

const ContactSales = () => {
  return (
    <>
      <ContactBanner pageFroms="Contact Us"/>
      <GetInTouch locations={["Ahmedabad: 3rd Floor, 305, Circle P, Sarkhej Gandhinagar Road, Opp. Panchavati Auto, 100 Foot Road, Ahmedabad, Gujarat, 380015", "Mumbai: Office No. 4, 4th Floor, K Raheja Prime, Marol CHS Rd, Marol, Andheri East, Mumbai, Maharashtra, 400059"]} />
    </>
  );
};

export default ContactSales;
