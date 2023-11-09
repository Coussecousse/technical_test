import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { actionTypes, selectors } from '../../redux/reducers/menu';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import TicketForm from '../../components/TicketForm/TicketForm';

export default function LeaveParking() {

    const menu: any = useSelector(selectors.getMenuValue); 
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
        if (menu) {
            dispatch({ type: actionTypes.CLOSE_MENU })
        }
    }, [])

    return (
        <main>
            <TicketForm formForLeaving={true} place={null}/>
        </main>
    )
}