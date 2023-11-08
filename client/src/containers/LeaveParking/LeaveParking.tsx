import { useRef, useState } from 'react';
import styles from './LeaveParking.module.css'

import paths from "../../config/paths"

interface Data {
    status: string,
    message: string
}

export default function LeaveParking() {

    const [data, setData] = useState<Data | null>(null);
    const input = useRef<HTMLInputElement>(null);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(paths.LEAVE_PARKING_API,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unique_id: (e.currentTarget.elements[0] as HTMLInputElement).value
            })
        
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleResponse = () => {
        if (data) {
            if (data.status === 'success') {
                if (input.current) {
                    input.current.value = '';
                }
                return <p className={`data-message`}>✅Vous avez quitté le parking</p>
            } else if (data.status === 'error') {
                return <p className={`data-message data-error`}>❌Erreur : {data.message}</p>
            }
        }
    }  
    

    return (
        <main>
            <div className={`ticket ${styles.leaveTicket}`}>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="ticket_id">
                        ID de votre ticket :
                    </label>
                    <div className={`${styles.inputContainer} inputContainer`}>
                        <input type="number" name="ticket_id" id="ticket_id" ref={input}/>
                        {handleResponse()}
                    </div>
                    <button type="submit" className={`${styles.button} button`}>Quitter le parking</button>
                </form>
            </div>
        </main>
    )
}