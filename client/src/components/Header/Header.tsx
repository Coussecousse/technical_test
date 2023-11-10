import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { selectors, actionTypes } from "../../redux/reducers/menu";
import { selectors as placesSelectors } from "../../redux/reducers/places";

import { useDispatch, useSelector } from "react-redux";

import paths from "../../config/paths";
import { useEffect, useState } from "react";

export default function Header() {

  const parking: any = useSelector(placesSelectors.getPlacesValue);
  const [ freePlaces, setFreePlaces ] = useState<number>(0);

  useEffect(() => {
    const places = parking.places.filter((place: any) => !place.occupied);
    setFreePlaces(places.length);
  }, [parking]);

  const isMenuOpen = useSelector(selectors.getMenuValue);
  const dispatch = useDispatch();

  const handleMenu = () => {
    if (isMenuOpen) {
      dispatch({ type: actionTypes.CLOSE_MENU });
    } else {
      dispatch({ type: actionTypes.OPEN_MENU });
    }
  }

  return (
    <header className={styles.header}>
        <a href={paths.SEE_PARKING} className={styles.car}><i className="fa-solid fa-car"></i><span>{freePlaces}</span></a>
        <nav
          className={`${styles.navContainer} ${isMenuOpen ? styles.open : ""}`}
        >
          <ul className={styles.linksContainer}>
            <li>
              <NavLink to={paths.HOME}>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={paths.GET_TICKET}>Se garer</NavLink>
            </li>
            <li>
              <NavLink to={paths.LEAVE_PARKING}>Quitter le parking</NavLink>
            </li>
            <li>
              <NavLink to={paths.SEE_PARKING}>Voir le parking</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.buttonContainer}>
        <button
          aria-label="Interract with menu"
          className={`${styles.mobileButton} ${isMenuOpen ? styles.open : ""}`}
          onClick={handleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
