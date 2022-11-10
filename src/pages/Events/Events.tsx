import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { getStatusColor } from '../../utils/utils';
import { useEventContext } from '../../hooks/UseEventContext';
import { eventsRequest } from '../../actions/EventsActions';
import { Link } from "react-router-dom"
import { ROUTES } from '../../config/consts'

// styles
import styles from './Events.module.css';


export default function Events() {

  const [tab, setTab] = useState<'all' | 'requested'>('all');
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const { token } = useAuthContext();
  const { events, dispatch } = useEventContext();


  const requested = events.filter((item) => {
      return item.status === 'requested';
  })

  const filteredEvents = tab === 'requested' ? requested : events

  const searchedEvents = filteredEvents.filter((item) => {
    return item.purchaseOrderId.includes(search)
})


  useEffect(() => {
    eventsRequest(token).then((response) => {
      dispatch({
        type: 'SET_EVENTS',
        payload: response
      }) 
      setLoading(false)
    })
  }, []);


  if (loading) {
    return <p>loading</p>
  }

  return (
    <div className={styles.wrapper}>
      <h1>Transports</h1>

      <div className={styles.navigation}>
        <div className={styles.filter}>
          <div className={`${styles.tab} ${tab === 'all' ? styles.active : ''}`} onClick={() => setTab('all')}>
            <p>All</p>
          </div>
          <div className={`${styles.tab} ${tab === 'requested' ? styles.active : ''}`} onClick={() => setTab('requested')}>
            <p>Requested</p>
          </div>
        </div>

        <div className={styles['search-container']}>
          <img
            className={styles['search-icon']}
            src={`./assets/Search.png`}
            alt="Search-icon"
          />
          <input 
            type="text" 
            placeholder="Search" 
            onChange={(e) => setSearch(e.target.value)}
            value={search}           
          />
        </div>
      </div>

      {searchedEvents.map((event) => (
        <Link className={styles.link} to={`${ROUTES.events}/${event.id}`}>
          
            <div className={styles['event-wrapper']} key={event.id}>
              
              <div className={styles['event-items']}>
                <p className={styles.grey}>Purchase Order Id:</p>
                <p className={styles.data}>{event.purchaseOrderId}</p>
              </div>

              <div className={styles['event-items']}>
                <p className={styles.grey}>Carrier:</p>
                <p className={styles.data}>{event.carrier}</p>
              </div>

              <div className={styles['event-items']}>
                <p className={styles.grey}>Truck LP:</p>
                <p className={styles.data}>{event.truckLP}</p>
              </div>

              <div className={styles['event-items']}>
                <p className={styles.grey}>Status:</p>
                <p className={`${styles.status} ${styles.data} ${styles[getStatusColor(event.status)]}`}>
                  {event.status}
                </p>
              </div>

              <div className={styles['event-items']}>
                <p className={styles.grey}>Arival Time:</p>
                <p className={styles.data}>{event.arivalTime}</p>
              </div>

              <div className={styles['event-items']}>
                <p className={styles.grey}>Trailer LP:</p>
                <p className={styles.data}>{event.trailerLP}</p>
              </div>
            </div>

          </Link>
        ))}
    </div>
  );
}
