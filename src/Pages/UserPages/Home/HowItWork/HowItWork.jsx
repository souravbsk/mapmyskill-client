import React from "react";
import message from "../../../../assets/images/message.gif";
import HowItWorksCard from "../../../../components/HowItWorksCard/HowItWorksCard";

const HowItWork = () => {
  return (
    <div className="mt-28 containerCl">
      <h3 className="text-center text-3xl font-normal text-black-500">
        How It Works
      </h3>
      <div className="grid md:grid-cols-3 grid-cols-1 mt-8">
        <HowItWorksCard
          sideborder
          image={message}
          title="Post Your Requirements"
          para="Just fill up an application to post you learning requirements on our platform."
          animation="fade-right"
      
        ></HowItWorksCard>
        <HowItWorksCard
          sideborder
          image={message}
          title="Choose Your Package"
          para="Pay the minimal charges on basis of the number of contacts you need."
          animation="fade-up"

        ></HowItWorksCard>
        <HowItWorksCard
          image={message}
          title="Connect With Tutor"
          para="Select your tutor and connect with him/her in no time."
          animation="fade-left"

        ></HowItWorksCard>
      </div>
    </div>
  );
};

export default HowItWork;
