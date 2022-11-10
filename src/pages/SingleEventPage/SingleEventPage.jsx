import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { env } from '../../config/config'
import { ROUTES } from '../../config/consts'
import { useAuthContext } from '../../hooks/useAuthContext'
import { getStatusColor } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
// import { SingleEventProps, ResponseEvent } from '../Events/Types';



//styles
import styles from './SingleEventPage.module.css'

export default function SingleEventPage() {

  const { id } = useParams()
  const { token } = useAuthContext();

  const navigate = useNavigate()

  const [singleEvent, setSingleEvent] = useState({})
  const [loading, setLoading] = useState(true)

  console.log(loading)

  const mapSingleEventData = (response) => {
    return {
      bookedFrom: response.from || "N/A",
      bookedTo: response.to || "N/A",
      POI: response.purchaseOrderId || "N/A",
      truckLP: response.truckLicensePlate || "N/A",
      trailerLP: response.trailerLicensePlate || "N/A",
      additioanInformation: response.additionalInformation || "N/A",
      status: response.status || "N/A",
      type: response.loadingType.name || "N/A",
      loadInput: response.loadInput || "N/A",
      assignedRamp: response.ramp || "N/A",
      carrierCompany: response.carrierCompany.companyName || "N/A",
      contactEmail: response.carrierCompany.contactEmail || "N/A"
    };
  };
  

  const fetchSingleEvent = async () => {

    setLoading(true)

    const rawResponse = await fetch(`${env.API_URL}${ROUTES.events}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    const singleEventResponse = await rawResponse.json()
    setSingleEvent(mapSingleEventData(singleEventResponse))

    setLoading(false)
    console.log('response: ', singleEventResponse)
  }

  useEffect(() => {
    fetchSingleEvent()
  }, [])
  
  if (loading) {
    return <p>loading</p>
  }

  

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>

        <div className={styles.details}>
            <h2>Event Details</h2>
        </div>

        <div className={styles.poi}>
          <p>Purchase Order Id</p>
          <h2>{singleEvent.POI}</h2>
        </div>

      </div>

      <div className={styles.events}>

        <div className={styles.planned}>
          <h3>Planned Information</h3>

          <div className={styles.info}>
            <p className={styles.grey}>Booked from :</p>
            <p>{singleEvent.bookedFrom}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Booked to :</p>
            <p>{singleEvent.bookedTo}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>POI :</p>
            <p>{singleEvent.POI}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Truck LP :</p>
            <p>{singleEvent.truckLP}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Trailer LP :</p>
            <p>{singleEvent.trailerLP}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Additional Information :</p>
            <p>{singleEvent.additioanInformation}</p>
          </div>

          <div className={styles.info}>
                <p className={styles.grey}>Status:</p>
                <p className={`${styles.status} ${styles[getStatusColor(singleEvent.status)]}`}>
                  {singleEvent.status}
                </p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Type :</p>
            <p>{singleEvent.type}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Load Input :</p>
            <p>{singleEvent.loadInput}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Assigned Ramp :</p>
            <p>{singleEvent.assignedRamp}</p>
          </div>

        </div>

        <div className={styles.live}>
          <h3>Live Information</h3>

          <div className={styles.info}>
            <p className={styles.grey}>Arrival Time :</p>
            <p>{singleEvent.bookedFrom}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>-</p>
            <div className={styles.empty}></div>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>POI :</p>
            <p>{singleEvent.POI}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Truck LP :</p>
            <p>{singleEvent.truckLP}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Trailer LP :</p>
            <p>{singleEvent.trailerLP}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Additional Information :</p>
            <p>{singleEvent.additioanInformation}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Carrier Company :</p>
            <p>{singleEvent.carrierCompany}</p>
          </div>

          <div className={styles.info}>
            <p className={styles.grey}>Contact Email :</p>
            <p>{singleEvent.contactEmail}</p>
          </div>

        </div>

        <div className={styles['btn-container']}>
        <div >
          <button 
            className={styles.btn}
            onClick={() => {navigate(ROUTES.events)}}
          >Back To Transport List</button>
        </div>
        </div>

      </div>
    </div>
  )
}
