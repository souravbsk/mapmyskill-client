import React from "react";

const TuitionJobMap = () => {
  return (
    <div className="border-2 mt-6 p-4">
      <h4 className="text-lg text-black mb-4 font-medium">Location</h4>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30765616.08155164!2d61.01124854389294!3d19.730992398978884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sbd!4v1699871230874!5m2!1sen!2sbd"
          className="w-full"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default TuitionJobMap;
