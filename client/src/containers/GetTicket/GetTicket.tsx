import { useEffect, useState } from "react";
import styles from "./GetTicket.module.css";

import paths from "../../config/paths";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updatePlaces } from "../../redux/reducers/places/actions/placesActions";

interface Data {
  unique_id: string,
  parking_place_id: string
}

export default function GetTicket() {

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Boolean>(false);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (data) return;
    fetch(paths.GET_TICKET_API)
    .then(res => res.json())
    .then(data => {
      setData(data)
      dispatch(updatePlaces()) 
    })
    .catch(err => {
      console.log(err);
      setError(true)
    }
    );

  }, []);

  return (
    <main>
      <div className={`ticket container${styles.getTicket}`}>
        { error ? (
          <p>Une erreur est survenue...</p>
        ) : (
          <>
            <h2 className='important'>
              <span>ID unique :</span> {data ? data.unique_id : "..."}
            </h2>
            <h3 className='important'>
              <span>Place :</span> {data ? data.parking_place_id : "..."}
            </h3>
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
