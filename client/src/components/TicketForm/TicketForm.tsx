import { useRef, useState } from "react";
import styles from "./TicketForm.module.css";

import paths from "../../config/paths";

interface Data {
  status: string;
  message: string;
}
interface TicketFormProps {
  formForLeaving: boolean;
  place: string | null | undefined;
}

export default function TicketForm({
  formForLeaving,
  place = null,
}: TicketFormProps) {
  const [data, setData] = useState<Data | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    const path = formForLeaving
      ? paths.LEAVE_PARKING_API
      : paths.UPDATE_TICKET_API;
    const body = formForLeaving
      ? JSON.stringify({
          unique_id: (e.currentTarget.elements[0] as HTMLInputElement).value,
        })
      : JSON.stringify({
          unique_id: (e.currentTarget.elements[0] as HTMLInputElement).value,
          place: place,
        });

    e.preventDefault();
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResponse = () => {
    if (data) {
      if (data.status === "success") {
        if (input.current) {
          input.current.value = "";
        }
        return <p className={`data-message`}>✅{ formForLeaving ? 'Vous avez quitté le parking' : 'Vous avez bien changé de place.'}</p>;
      } else if (data.status === "error") {
        return (
          <p className={`data-message data-error`}>❌Erreur : {data.message}</p>
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
        {formForLeaving ? 'Quitter le parking' : 'Changer de place'}
        </button>
    </form>
    </div>
  );
}
