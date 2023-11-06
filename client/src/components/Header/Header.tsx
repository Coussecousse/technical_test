import { NavLink } from "react-router-dom";
import styles from "./Header.module.css"

import paths from '../../config/paths'

export default function Header() {
    return(
        <header className={styles.header}>
            <nav className={styles.navContainer}>
                <ul className={styles.linksContainer}>
                    <li><NavLink to={paths.HOME}>Accueil</NavLink></li>
                    <li><NavLink to={paths.GET_TICKET}>Se garer</NavLink></li>
                    <li><NavLink to={paths.LEAVE_PARKING}>Quitter le parking</NavLink></li>
                    <li><NavLink to={paths.SEE_PARKING}>Parking</NavLink></li>
                </ul>
            </nav>
            <button className={styles.mobileButton}><span></span><span></span><span></span></button>
        </header>
    )
}