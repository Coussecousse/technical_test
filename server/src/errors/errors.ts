export const errors = {
    DEFAULT : { status: '400', message: 'Une erreur est survenue.'},
    NO_PLACES : { status: '400', cause: 'NO_PLACES', message: 'Place déjà occupée.'},
    PLACE_TAKEN : { status: '400', cause: 'PLACE_TAKEN', message: 'Place déjà occupée.'},
    WRONG_ID : { status: '400', cause: 'WRONG_ID', message: 'Mauvais ID.' },
    PARKING_FULL : { status: '400', cause: 'PARKING_FULL', message: 'Parking complet.'},
    SAME_PLACE : { status: '400', cause: 'SAME_PLACE', message: 'Même place.'},
    EMPTY_ID : { status: '400', cause: 'EMPTY_ID', message: 'Valeur vide.'},
}