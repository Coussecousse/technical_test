import { useEffect, useState } from "react";
import paths from "../../config/paths";
import styles from "./GetTicket.module.css";

export default function GetTicket() {

  const [data, setData] = useState({});
  const [error, setError] = useState(false);


  useEffect(() => {
    if (data.length > 0) return;
    fetch('/create-ticket')
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
      <div className={styles.ticket}>
        { error ? (
          <p>Une erreur est survenue...</p>
        ) : (
          <>
            <h2 className={styles.important}>
              <span>ID unique :</span> {data.unique_id ? data.unique_id : "..."}
            </h2>
            <p className={styles.important}>
              <span>Place :</span> {data.parking_place_id ? data.parking_place_id : "..."}
            </p>
            <p>Pensez à garder votre ID sous la main !</p>
            <a href={paths.SEE_PARKING} className={styles.button}>
              Trouver sa place
            </a>
            <a href={paths.SEE_PARKING} className={styles.button}>
              Changer de place
            </a>
          </>
        )}
      </div>
    </main>
  );
}
