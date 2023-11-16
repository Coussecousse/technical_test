import styles from './ButtonPlace.module.css';

interface ButtonPlaceProps {
    handleButton: (event: React.MouseEvent<HTMLButtonElement>) => void,
    place: number,
    occupied: boolean,
}

export default function ButtonPlace({ handleButton, place, occupied }: ButtonPlaceProps) {
    return (
        <button
            onClick={handleButton}
            data-place={place}
            data-occupied={occupied}
            className={`${styles.place} ${occupied ? styles.occupied : styles.free}`}
        >{place}
        </button>
    )
}