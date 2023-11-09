import TicketForm from '../../components/TicketForm/TicketForm';

interface Data {
    status: string,
    message: string
}

export default function LeaveParking() {

    return (
        <main>
            <TicketForm formForLeaving={true} place={null}/>
        </main>
    )
}