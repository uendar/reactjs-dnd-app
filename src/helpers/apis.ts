import axios, { AxiosResponse } from "axios";

export const apiGet = async <T>(
  url: string,
  setLoading?: Function
): Promise<{ response?: AxiosResponse<T>; error?: string }> => {
  let response: AxiosResponse<T> | undefined;
  let errorMessage: string | undefined;

  try {
    setLoading && setLoading(true);
    response = await axios.get<T>(url);
  } catch (error: any) {
    errorMessage = error.message;
  } finally {
    setLoading && setLoading(false);
  }

  return { response, error: errorMessage };
};
