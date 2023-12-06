import React, { useEffect, useState } from "react";
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import axios from "axios";
import useGetValue from "../../../Hooks/useGetValue";
import usePlanDataValue from "../../../Hooks/usePlanDataValue";
import useAuthChanged from "../../../Hooks/useAuthChanged";

function SubscriptionSection() {
  const { user } = useAuthChanged();
  const [planData, setPlanData] = useState([]);
  const { itemValue: planType1 } = usePlanDataValue("teacherplan")
  const { itemValue: planType2 } = usePlanDataValue("course-plan")
  const { itemValue: planType3 } = usePlanDataValue("assesment-plan")
  const { itemValue: planType4 } = usePlanDataValue("student-plan")

  


  useEffect(() => {

    setPlanData([])
    // let url = `http://localhost:8080/api/subscriptionplans`;

    if (user?.roleid == 4) {
      // url = `http://localhost:8080/api/subscriptionplans/bystatus?type1=${planType1}&type2=${planType2}&type3=${planType3}`;

      axios
          .get(`http://localhost:8080/api/subscriptionplans/bystatus?type1=${planType1}&type2=${planType2}&type3=${planType3}`)
          .then((res1) => {
            console.log("subs data res1", res1.data);
            res1 ? setPlanData(res1?.data) : null;
          })
          .catch((error) => {
            console.error("Error fetching subscription data", error);
          });
    } 

    if (user?.roleid == 3) {
      // url = `http://localhost:8080/api/subscriptionplans/bystatus?type4=${planType4}`;

      axios
      .get(`http://localhost:8080/api/subscriptionplans/bystatus?type4=${planType4}`)
      .then((res2) => {
        console.log("subs data res2", res2.data);
        res2 ? setPlanData(res2?.data) : null;
      })
      .catch((error) => {
        console.error("Error fetching subscription data", error);
      });

    }

 

      // axios
      //     .get(url)
      //     .then((response) => {
      //       console.log("subs data response", response.data);
      //       response ? setPlanData(response?.data) : null;
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching subscription data", error);
      //     });
    
}, [user, planType1, planType2, planType3, planType4]);



console.log("planData", planData);
console.log("user", user?.userid);
// console.log("planType", planType1);
// console.log("planType2", planType2);
// console.log("planType3", planType3);
console.log("planType4", planType4);



return (
  <div className="grid mt-12 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 mb-8 gap-8 ">
    {planData.length > 0 &&
      planData?.map((items, i) => (
        <SubscriptionCard key={i} items={items}></SubscriptionCard>
      ))}
  </div>
);
}

export default SubscriptionSection;
