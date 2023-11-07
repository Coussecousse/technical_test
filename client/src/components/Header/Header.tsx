import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";

import paths from "../../config/paths";
import { selectors, actionTypes } from "../../redux/reducers/menu";

export default function Header() {
  const isMenuOpen = useSelector(selectors.getMenuValue);
  const dispatch = useDispatch();

  const handleMenu = () => {
    if (isMenuOpen) {
      dispatch({ type: actionTypes.CLOSE_MENU });
    } else {
      dispatch({ type: actionTypes.OPEN_MENU });
    }
  };

  return (
    <header className={styles.header}>
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
