import axios from "axios";

const getCitysService = async (stateId: string) => {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades";

  const citys = await axios.get(`${url}/estados/${stateId}/municipios`);

  return citys.data;
};
export default getCitysService;
