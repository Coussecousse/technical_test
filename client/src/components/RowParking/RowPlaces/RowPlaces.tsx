import { useSelector } from "react-redux";
import ButtonPlace from "../../../containers/SeeParking/ButtonPlace/ButtonPlace";
import styles from "./RowPlaces.module.css";
import { selectors } from "../../../redux/reducers/places";
import { useEffect, useState } from "react";

interface RowPlacesProps {
  index: number;
  max: number;
  handleButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RowPlaces({
  index,
  max,
  handleButton,
}: RowPlacesProps) {
  // Get the parking
  const parking: any = useSelector(selectors.getPlacesValue);

  // All the places
  const [buttons, setButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    for (let i = index; i <= max; i++) {
      if (parking.places.length === 0) return;
      const place = parking.places[i];
      const button = (
        <ButtonPlace
          key={i}
          handleButton={handleButton}
          place={place.place}
          occupied={place.occupied}
        />
      );
      setButtons((buttons) => [...buttons, button]);
    }
  }, [parking]);
  return <div className={styles.places}>{buttons}</div>;
}
