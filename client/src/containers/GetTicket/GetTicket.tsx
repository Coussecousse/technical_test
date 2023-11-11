import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updatePlaces } from "../../redux/reducers/places/actions/placesActions";

import styles from "./GetTicket.module.css";
import paths from "../../config/paths";
import { actionTypes, selectors } from "../../redux/reducers/menu";

interface Data {
  unique_id: string;
  parking_place_id: string;
}

interface ErrorData {
  error: boolean;
  message: string;
}

export default function GetTicket() {
  // MENU
  const menu: any = useSelector(selectors.getMenuValue);
  const dispatch = useDispatch<AppDispatch>();

  // eslint-disable-next-line
  useEffect(() => {
    if (menu) {
      dispatch({ type: actionTypes.CLOSE_MENU });
    }
  }, []);

  // DATA
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<ErrorData | null>();

  const query = new URLSearchParams(window.location.search);
  const placeSelected = query.toString() !== "" ? query.get("place") : null;

  const fetchData = async (
    method: string | undefined = "GET",
    body: null | Object = null
  ) => {
    try {
      const res = await fetch(paths.GET_TICKET_API, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data;
    } catch (err: any) {
      throw err;
    }
  };

  const getData = async () => {
    try {
      const data = placeSelected
        ? await fetchData("POST", { parking_place_id: placeSelected })
        : await fetchData();
      setData(data);
      dispatch(updatePlaces());
    } 
    // eslint-disable-next-line
    catch (err: any) {
      err = await err.json();
      setError((prevState) => ({
        ...prevState,
        error: true,
        message: err.message,
      }));
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (data) return;
    getData();
  }, []);

  return (
    <main>
      <div className={`ticket container ${styles.getTicket}`}>
        {error ? (
          <>
            <p className={`data-error`}>❌{error.message}</p>
            <a href={paths.GET_TICKET} className={`${styles.button} button`}>
              Nouveau ticket
            </a>
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
