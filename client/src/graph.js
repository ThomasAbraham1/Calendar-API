import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
*/
// @param accessToken 
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
console.log(accessToken)
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    // return fetch(graphConfig.graphCalendarEndPoint, options)
    //     .then(response => response.json())
    //     .catch(error => console.log(error));
    const [calendarGraphData, profileGraphData] = await Promise.all([fetch(graphConfig.graphCalendarEndPoint, options), fetch(graphConfig.graphMeEndpoint, options)]);
    return [await calendarGraphData.json(), await profileGraphData.json()]
}