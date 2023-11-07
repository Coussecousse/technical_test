import paths from '../../config/paths';
import styles from './GetTicket.module.css';

export default function GetTicket() {
    return (
        <main>
            <div className={styles.ticket}>
                <h2 className={styles.important}><span>ID unique :</span> 12345</h2>
                <p className={styles.important}><span>Place :</span> 23</p>
                <p>Pensez à garder votre ID sous la main !</p>
                <a href={paths.SEE_PARKING} className={styles.button}>Trouver sa place</a>
                <a href={paths.SEE_PARKING} className={styles.button}>Changer de place</a>
            </div>
        </main>
    )
}