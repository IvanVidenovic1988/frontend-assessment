import { createContext, FC, useReducer } from "react";
import { EventProps } from '../pages/Events/Types';

type EventCntx = {
    events: EventProps[];
    dispatch: React.Dispatch<Actions>
}

type State = {
    events: EventProps[]
}

type Actions = { type: 'SET_EVENTS'; payload: EventProps[]}

export const EventContext = createContext({} as EventCntx)


export const eventReducer = (state: State, action: Actions) => {
    
    switch (action.type) {
        case 'SET_EVENTS':
            return { ...state, events: action.payload }
         default: 
            return state
    }
}

export const EventContextProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(eventReducer, {
        events: []
    })


    return (
        <EventContext.Provider value={{ ...state, dispatch }}>
            { children }
        </EventContext.Provider>
    )
}