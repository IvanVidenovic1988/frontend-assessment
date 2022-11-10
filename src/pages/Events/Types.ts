export type EventStatus = "approved" | "requested" | "declined" | "registered"

export type ResponseEvent = {
  actualArrivalTime: string | null;
  additionalInformation: string;
  carrierCompany: {id: number, companyName: string, contactEmail: string, contactPhone: string, companyNameSlug: string, updatedAt: string | null}
  carrierCompanyId: number;
  driverId: string | null;
  driverInfoId: string | null;
  e80w: string | null;
  estimatedArrivalTime: string | null;
  from: string;
  id: number;
  loadInput: string;
  loadingCapacity: number | null;
  loadingDuration: number | null;
  loadingEnd: string | null
  loadingStart: string | null
  loadingType: {id: number, name: string, comment: string}
  loadingTypeId: number;
  modificationId: number | null;
  purchaseOrderId: string;
  ramp: string | null;
  rampFree: boolean | null;
  rampId: number | null;
  returnTrip: boolean;
  scheduledFrom: string;
  scheduledTo: string | null;
  status: EventStatus;
  to: string;
  trailerLicensePlate: string;
  transportId: string;
  truckLicensePlate: string;
  warehouseId: number;
  }
  
  export type EventProps = {
    purchaseOrderId: string;
    carrier: string;
    truckLP: string;
    status: EventStatus;
    arivalTime: string | null;
    trailerLP: string;
    id: number;
  }

  export type SingleEventProps = {
      bookedFrom: string;
      bookedTo: string;
      POI: string;
      truckLP: string;
      trailerLP: string;
      additioanInformation: string | null;
      status: string;
      type: string;
      loadInput: string | null;
      assignedRamp: string | null;
      carrierCompany: string;
      contactEmail: string;
  }