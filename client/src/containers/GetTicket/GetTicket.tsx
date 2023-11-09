import { useEffect, useState } from "react";
import styles from "./GetTicket.module.css";

import paths from "../../config/paths";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updatePlaces } from "../../redux/reducers/places/actions/placesActions";

interface Data {
  unique_id: string;
  parking_place_id: string;
}

interface ErrorData {
  error : boolean,
  message: string
}

export default function GetTicket() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<ErrorData | null>();
  const dispatch = useDispatch<AppDispatch>();

  const query = new URLSearchParams(window.location.search);
  const placeSelected = query.toString() !== "" ? query.get("place") : null;

  const fetchData = async (method:string | undefined = 'GET', body: null | Object = null) => {
    try {
      const res = await fetch(paths.GET_TICKET_API, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
      });
      if (!res.ok) {
        throw new Error("La place non disponible.", {cause :"PlaceNotAvailable"});
      }
      const data = await res.json();
      return data;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }

  const getData = async () => {
    try {
      const data = placeSelected ? 
      await fetchData('POST', { parking_place_id: placeSelected }) :
      await fetchData();
      setData(data);
      dispatch(updatePlaces());
    }
    catch (err: any) {      
      if (err.cause === "PlaceNotAvailable") {
        setError(prevState => ({ ...prevState, error: true, message: "❌La place n'est pas disponible." }));
      } else {
        setError(prevState => ({ ...prevState, error: true, message: "Une erreur est survenue" }));
      }
    }
  } 

  useEffect(() => {
    if (data) return;
    getData();
  }, []);

  return (
    <main>
      <div className={`ticket container ${styles.getTicket}`}>
        {error ? (
          <>
            <p>{error.message}</p>
            <a href={paths.GET_TICKET} className={`${styles.button} button`}>Nouveau ticket</a>
          </>
          
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
