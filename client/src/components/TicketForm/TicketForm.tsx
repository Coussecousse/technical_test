import { useRef, useState } from "react";
import styles from "./TicketForm.module.css";

import paths from "../../config/paths";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updatePlaces } from "../../redux/reducers/places/actions/placesActions";

interface Data {
  status: string;
  message: any;
  statusCode: string;
}
interface TicketFormProps {
  formForLeaving: boolean;
  place: string | null | undefined;
}

export default function TicketForm({
  formForLeaving,
  place = null,
}: TicketFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<Data | null>(null);
  const input = useRef<HTMLInputElement>(null);
  
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const unique_id = (e.currentTarget.elements[0] as HTMLInputElement).value;
    
    const path = formForLeaving
      ? paths.LEAVE_PARKING_API
      : paths.UPDATE_TICKET_API;
    const body = formForLeaving
      ? JSON.stringify({
          unique_id: unique_id ? Number(unique_id) : '',
        })
      : JSON.stringify({
          unique_id: unique_id ? Number(unique_id) : '',
          place: place ? Number(place) : '',
        });
        fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updatePlaces());
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleResponse = () => {
    if (data) {
      if (data.status === "success") {
        if (input.current) {
          input.current.value = "";
        }
        return (
          <p className={`data-message`}>
            ✅
            {formForLeaving
              ? "Vous avez quitté le parking"
              : "Vous avez bien changé de place."}
          </p>
        );
      } else  {
        return (
          <p className={`data-message data-error`}>❌Erreur : {typeof data.message !== 'object' ? data.message : data.message[0].message}</p>
        );
      }
    }
  };

  return (
    <div className={`ticket container ${styles.leaveTicket}`}>
      <form onSubmit={handleForm} className={styles.form}>
        <label htmlFor='ticket_id'>ID de votre ticket :</label>
        <div className={`${styles.inputContainer} inputContainer`}>
          <input type='number' name='ticket_id' id='ticket_id' ref={input} />
          {handleResponse()}
        </div>
        <button type='submit' className={`${styles.button} button`}>
          {formForLeaving ? "Quitter le parking" : "Changer de place"}
        </button>
      </form>
    </div>
  );
}
