import { env } from '../config/config';
import { ROUTES } from '../config/consts';
import { EventProps, ResponseEvent } from '../pages/Events/Types';


const mapEventData = (response: ResponseEvent): EventProps => {
    return {
      purchaseOrderId: response.purchaseOrderId,
      carrier: response.carrierCompany.companyName,
      truckLP: response.truckLicensePlate,
      status: response.status,
      arivalTime: response.estimatedArrivalTime,
      trailerLP: response.trailerLicensePlate,
      id: response.id,
    };
  };


export const eventsRequest = async (token: string | null) => {

    const rawResponse = await fetch(`${env.API_URL}${ROUTES.events}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const eventsResponse: ResponseEvent[] = await rawResponse.json();
    const events = eventsResponse.map((event) => {
      return mapEventData(event);
    });

    return events
   };

    