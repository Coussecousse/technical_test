import styles from './LeaveParking.module.css'
import { useState } from 'react'

import paths from "../../config/paths"

export default function LeaveParking() {

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submission logic here
    }
    

    return (
        <main>
            <div className={`ticket ${styles.leaveTicket}`}>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="ticket_id">
                        ID de votre ticket :
                    </label>
                    <input type="number" name="ticket_id" id="ticket_id" />
                    <button type="submit" className={`${styles.button} button`}>Quitter le parking</button>
                </form>
            </div>
        </main>
    )
}