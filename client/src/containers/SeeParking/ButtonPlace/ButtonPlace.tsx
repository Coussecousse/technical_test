import styles from './ButtonPlace.module.css';

interface ButtonPlaceProps {
    handleButton: (event: React.MouseEvent<HTMLButtonElement>) => void,
    place: number,
    occupied: boolean,
    key : number
}

export default function ButtonPlace({ handleButton, place, occupied, key }: ButtonPlaceProps) {
    return (
        <button
            key={key}
            onClick={handleButton}
            data-place={place}
            data-occupied={occupied}
            className={`${styles.place} ${occupied ? styles.occupied : styles.free}`}
        >{place}
        </button>
    )
}