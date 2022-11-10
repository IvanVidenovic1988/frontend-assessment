import { RequestHandler } from '../utils/createHandler';
import { mockEvents } from '../mock-data';
import { takeANap } from '../utils/take-a-nap';
type EventsQuery = Record<'search' | 'status', string>;

export const events: RequestHandler = async (req, res, user) => {
  const query = req.query as EventsQuery;

  await takeANap();

  const events = mockEvents.filter((event) => {
    let good = true;

    if (query?.status) {
      good = event.status === query.status;
    }

    if (good && query?.search) {
      good = [
        event.purchaseOrderId,
        event.trailerLicensePlate,
        event.truckLicensePlate,
        event?.loadingType?.name,
        event?.carrierCompany?.companyName,
      ].some((a) =>
        (a || '').toLowerCase().includes(query.search.toLowerCase())
      );
    }

    return good;
  });

  res.status(200);
  res.json(events);
};
