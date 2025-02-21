import axios from "axios";

const url = "https://vivid-music.vercel.app";

const fetchData = async ({ filter, setData }) => {
   if (filter === "all") {
      try {
         const res = await axios.get(`${url}/dashboard/allSongsData`
            
         );
         setData(res.data.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   }
};

export default fetchData;
