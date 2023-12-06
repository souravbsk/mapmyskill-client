import axios from "axios";
import { useEffect, useState } from "react";


const useFetchValue = (itemValue) => {
    const [getValue,setGetValue] = useState([])

    useEffect(() => {
     fetch("/staticData.json")
     .then(res => (res.json()))
     .then(data=>{
      const dataValue = data.find(item => item?.name.toLowerCase() == itemValue.toLowerCase())
      axios.get('http://localhost:8080/api/systemlistitem')
      .then(res => {
        if(res.statusText == "OK"){
          const allValue = res.data.filter(item => item?.listid == dataValue.value)
          setGetValue(allValue)
        }
      })
     })
    }, [])

      return {getValue,setGetValue}
};

export default useFetchValue;