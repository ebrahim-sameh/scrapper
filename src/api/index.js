import axios from "axios";

export const getData = async(route) => {
  const data = await axios.get(`https://mobile.fmcsa.dot.gov/qc/services/carriers/${route}?webKey=f9d9a84990f7f4a5b72ebba8ccdb7bb861a44eff`)
  return data.data.content;
}