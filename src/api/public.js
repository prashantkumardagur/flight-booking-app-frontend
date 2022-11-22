import runAPI from "./runAPI";


// Get all airports
export const getAirportsAPI = async () => {
  return await runAPI("/public/get-all-airports");
}

// Get all flights
export const getFlightsAPI = async () => {
  return await runAPI("/public/get-all-flights");
}

// Search airports
export const searchAirportsAPI = async (search) => {
  return await runAPI("/public/airport-search", '',{search});
}

// Find flights
export const findFlightsAPI = async (query) => {
  return await runAPI("/public/find-flights", '', query);
}