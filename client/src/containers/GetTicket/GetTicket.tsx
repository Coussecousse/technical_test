import { useEffect, useState } from "react";
import styles from "./GetTicket.module.css";

import paths from "../../config/paths";

interface Data {
  unique_id: string,
  parking_place_id: string
}

export default function GetTicket() {

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Boolean>(false);


  useEffect(() => {
    if (data) return;
    fetch(paths.GET_TICKET_API)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      console.log(err);
      setError(true)
    }
    );
  }, []);

  return (
    <main>
      <div className={`ticket ${styles.getTicket}`}>
        { error ? (
          <p>Une erreur est survenue...</p>
        ) : (
          <>
            <h2 className={styles.important}>
              <span>ID unique :</span> {data ? data.unique_id : "..."}
            </h2>
            <p className={styles.important}>
              <span>Place :</span> {data ? data.parking_place_id : "..."}
            </p>
            <p>Pensez à garder votre ID sous la main !</p>
            <a href={paths.SEE_PARKING} className={`${styles.button} button`}>
              Trouver sa place
            </a>
            <a href={paths.SEE_PARKING} className={`${styles.button} button`}>
              Changer de place
            </a>
          </>
        )}
      </div>
    </main>
  );
}
