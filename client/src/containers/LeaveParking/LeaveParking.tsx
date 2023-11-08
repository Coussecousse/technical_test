import styles from './LeaveParking.module.css'

import paths from "../../config/paths"

export default function LeaveParking() {

    const handleForm = () => {

    }
    
    const handleChange = () => {
        
    }    

    return (
        <main>
            <div className={`ticket ${styles.leaveTicket}`}>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="ticket_id">
                        ID de votre ticket :
                    </label>
                    <input type="number" name="ticket_id" id="ticket_id" onChange={handleChange}  />
                    <button type="submit" className={`${styles.button} button`}>Quitter le parking</button>
                </form>
            </div>
        </main>
    )
}