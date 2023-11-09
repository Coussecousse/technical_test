import { useEffect } from "react";
import { useSelector } from "react-redux";
import { actionTypes, selectors } from "../../redux/reducers/menu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import styles from "./Home.module.css";
import paths from "../../config/paths";

export default function Home() {
  // MENU
  const menu: any = useSelector(selectors.getMenuValue);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (menu) {
      dispatch({ type: actionTypes.CLOSE_MENU });
    }
  }, []);

  return (
    <main>
      <div className={styles.linksContainer}>
        <a href={paths.GET_TICKET} className={styles.link}>
          Prendre un ticket
        </a>
        <a href={paths.LEAVE_PARKING} className={styles.link}>
          Quitter le parking
        </a>
        <a href={paths.SEE_PARKING} className={styles.link}>
          Voir le parking
        </a>
      </div>
    </main>
  );
}
