export const errors = {
    DEFAULT : { status: 'error', message: 'Une erreur est survenue.'},
    NO_PLACES : { status: 'error', cause: 'NO_PLACES', message: 'Place déjà occupée.'},
    PLACE_TAKEN : { status: 'error', cause: 'PLACE_TAKEN', message: 'Place déjà occupée.'},
    WRONG_ID : { status: 'error', cause: 'WRONG_ID', message: 'Mauvais ID.' },
    PARKING_FULL : { status: 'error', cause: 'PARKING_FULL', message: 'Parking complet.'},
    SAME_PLACE : { status: 'error', cause: 'SAME_PLACE', message: 'Même place.'}
}