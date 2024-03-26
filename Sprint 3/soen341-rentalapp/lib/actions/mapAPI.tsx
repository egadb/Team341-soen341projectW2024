"use server";
import axios from "axios";

export const handleSearch = async (prevState: any, formData: FormData) => {
  const key = process.env.GOOGLE_API_KEY;

  const postalCode = formData.get("postalCode");
  const pcBranch1 = "H4Y1H1";
  const pcBranch2 = "H7T2Y5";
  const pcBranch3 = "H9R5J2";

  //In order to use the "Search Nearest Branch" feature, assuming Google Chrome is being used, one will need to install the "Allow CORS: Access-Control-Allow-Origin" extension and enable it.

  try {
    //Time from Montreal branch
    const response1 = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${postalCode}&destinations=${pcBranch1}&key=${key}`
    );
    const duration1 = response1.data.rows[0].elements[0].duration.text;

    //Time from Laval branch
    const response2 = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${postalCode}&destinations=${pcBranch2}&key=${key}`
    );
    const duration2 = response2.data.rows[0].elements[0].duration.text;

    //Time from West Island branch
    const response3 = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${postalCode}&destinations=${pcBranch3}&key=${key}`
    );
    const duration3 = response3.data.rows[0].elements[0].duration.text;

    //Find nearest branch
    const durations = [duration1, duration2, duration3];
    const minDuration = Math.min(...durations.map((duration) => parseInt(duration)));
    const minDurationIndex = durations.findIndex((duration) => parseInt(duration) === minDuration);
    const minDurationName = `duration${minDurationIndex + 1}`;
    const nearestBranch =
      minDurationName === "duration1"
        ? "Montreal"
        : minDurationName === "duration2"
          ? "Laval"
          : "West Island";
    console.log(duration1);
    return {
      duration1: duration1,
      duration2: duration2,
      duration3: duration3,
      nearestBranch: nearestBranch,
    };
  } catch (error) {
    console.error(error);
  }
};
