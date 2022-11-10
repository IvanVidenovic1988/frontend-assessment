import { RequestHandler } from '../utils/createHandler';
import { mockEvents } from '../mock-data';
import { takeANap } from '../utils/take-a-nap';

export const event: RequestHandler = async (req, res, user) => {
  const { id } = req.params as Record<'id', string>;

  await takeANap();

  if (Number.isNaN(+id)) {
    res.status(400);
    res.json({ message: 'Event id must be a number' });
    return;
  }

  const event = mockEvents.find((ev) => ev.id === +id);

  if (!event) {
    res.status(400);
    res.json({ message: 'Event with given id does not exit' });
  } else {
    res.status(200);
    res.json(event);
  }
};
