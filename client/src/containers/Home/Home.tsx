import styles from './Home.module.css'

import paths from "../../config/paths"

export default function Home() {
    return (
        <main >
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
    )
}