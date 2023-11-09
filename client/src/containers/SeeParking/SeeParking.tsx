import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../redux/reducers/places";
import styles from "./SeeParking.module.css";

import paths from "../../config/paths";
import RowPlaces from "../../components/RowParking/RowPlaces/RowPlaces";
import RowEmpty from "../../components/RowParking/RowEmpty/RowEmpty";
import TicketForm from "../../components/TicketForm/TicketForm";

export default function SeeParking() {
  const [selectedPlace, setSelectedPlace] = useState<string | undefined>(
    undefined
  );

  
  const parking: any = useSelector(selectors.getPlacesValue);

  const informations = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const placeSelected = useRef<HTMLHeadingElement>(null);
  const ticketChangePlace = useRef<HTMLDivElement>(null);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    if (button.dataset.occupied === "true") return;

    if (window.innerWidth >= 768) {
      setTimeout(() => {
        informations.current?.classList.remove(styles.hidden);
      }, 500);
    } else {
      informations.current?.classList.remove(styles.hidden);
    }

    const placeNumber = button.dataset.place;
    setSelectedPlace(placeNumber);

    map.current?.classList.add(styles.close);
  };

  const handleChangeTicket = () => {
    const rect = ticketChangePlace.current?.getBoundingClientRect();
    const top = rect?.top;
    const height = ticketChangePlace.current?.offsetHeight;
    const scroll = top ? top - height! / 2 : 0;

    window.scrollTo(0, scroll);
    setTimeout(() => {
      ticketChangePlace.current?.classList.remove(styles.hidden);
    }, 200);

  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.elementsContainer}`}>
        <div className={styles.map} ref={map}>
          {parking.places.length > 0 && (
            <>
              <RowPlaces index={0} max={9} handleButton={handleButton} />
              <RowEmpty></RowEmpty>
              <RowPlaces index={10} max={19} handleButton={handleButton} />
              <RowPlaces index={20} max={29} handleButton={handleButton} />
              <RowEmpty></RowEmpty>
            </>
          )}
        </div>
        <div
          className={`${styles.informations} ${styles.hidden}`}
          ref={informations}
        >
          <h2 className={`important ${styles.title}`} ref={placeSelected}>
            <span>Place :</span>
            {selectedPlace}
          </h2>
          <div className={styles.buttonContainer}>
            <p>Pas de ticket ?</p>
            <a
              href={`${paths.GET_TICKET}${
                selectedPlace !== undefined ? `?place=${selectedPlace}` : null
              }`}
              className={`${styles.button} button`}
            >
              Prendre cette place
            </a>
          </div>
          <div className={styles.buttonContainer}>
            <p>Vous avez déjà un ticket ?</p>
            <button className={`${styles.button} button`} onClick={handleChangeTicket}>
              Changer de place
            </button>
          </div>
        </div>
      </div>
      <div id="ticket" className={`${styles.hidden} ${styles.ticket}`} ref={ticketChangePlace}>
        <TicketForm 
          formForLeaving={false}
          place={selectedPlace}
        />
      </div>
    </main>
  );
}
