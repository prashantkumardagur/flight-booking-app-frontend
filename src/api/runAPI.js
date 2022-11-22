export const hostUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:7000';


// Function to run APIs
const runAPI = async (url, token='', body={}) => {

  const apiUrl = new URL(`${hostUrl}${url}`);

  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }).then(res => res.json());

}

export default runAPI;
