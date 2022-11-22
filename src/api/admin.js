import runAPI from "./runAPI";


// Add a new airport
export const addAirportAPI = async (token, airport) => {
  return await runAPI("/admin/add-airport", token, airport);
}

// Add a new flight
export const addFlightAPI = async (token, flight) => {
  return await runAPI("/admin/add-flight", token, flight);
}

// Delete a flight
export const deleteFlightAPI = async (token, id) => {
  return await runAPI("/admin/delete-flight", token, {id});
}