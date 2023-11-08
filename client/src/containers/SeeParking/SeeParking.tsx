import { useRef } from "react";
import styles from "./SeeParking.module.css";
import paths from "../../config/paths";

export default function SeeParking() {
  const informations = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const placeSelected = useRef<HTMLHeadingElement>(null);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    if (button.dataset.occupied === "true") return;
    
    if (window.innerWidth >= 768) {
        setTimeout(() => {
            informations.current?.classList.remove(styles.hidden);
        }, 500);
    } else {
        informations.current?.classList.remove(styles.hidden);
    }

    const placeNumber = button.dataset.place;
    if (placeSelected.current)  {
        placeSelected.current.innerHTML = `<span>Place :</span>${placeNumber}`;
    }
    map.current?.classList.add(styles.close);
  };
  return (
    <main>
      <div className={`container ${styles.elementsContainer}`}>
        <div className={styles.map}  ref={map}>
          {/* faire un map ici */}
          <div className={styles.places}>
            <button
              onClick={handleButton}
              data-place='1'
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              1
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              2
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              3
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              4
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            >
              5
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              6
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              7
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              8
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            >
              9
            </button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            >
              10
            </button>
          </div>
          <div></div>
          <div className={styles.places}>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='true'
              className={`${styles.place} ${styles.occupied}`}
            ></button>
          </div>
          <div className={styles.places}>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
            <button
              onClick={handleButton}
              data-place=''
              data-occupied='false'
              className={`${styles.place} ${styles.free}`}
            ></button>
          </div>
          <div></div>
        </div>
        <div
          className={`${styles.informations} ${styles.hidden}`}
          ref={informations}
        >
              <h2 className={`important ${styles.title}`} ref={placeSelected}>
              </h2>
          <div className={styles.buttonContainer}>
              <p>Pas de ticket ?</p>
              <a href={paths.GET_TICKET} className={`${styles.button} button`}>Prendre cette place</a>
          </div>
          <div className={styles.buttonContainer}>
              <p>Vous avez déjà un ticket ?</p>
              <button className={`${styles.button} button`}>
                Changer de place
              </button>
          </div>
        </div>
      </div>
    </main>
  );
}
