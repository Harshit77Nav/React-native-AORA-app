import { useState, useEffect } from "react";

const useAppwrite =(fn)=>{
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] =  useState(false);
    
    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () =>{
        setIsLoading(true)
        try {
          const res = await fn();
          setData(res);
  
        } catch (error) {
          Alert.alert("Error",error.message)
  
        }  finally {
          setIsLoading(false)
  
        }
      }

    const refetch = ()=>fetchData();

    return{data, isLoading, refetch}; 
}

export default useAppwrite;