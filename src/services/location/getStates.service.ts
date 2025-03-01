import axios from "axios";

const getStatesService = async () => {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades";

  const states = await axios.get(`${url}/estados`);
  return states.data;
};
export default getStatesService;
