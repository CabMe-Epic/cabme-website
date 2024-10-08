import { useState, useEffect } from 'react';

interface ReservationDateTime {
    pickupDate: string;
    dropoffDate: string;
    pickupTime: string;
    dropoffTime: string;
}

const useReservationDateTime = () => {
    const [reservationDateTime, setReservationDateTime] = useState<ReservationDateTime>({
        pickupDate: '',
        dropoffDate: '',
        pickupTime: '',
        dropoffTime: ''
    });
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const getPickup = localStorage.getItem("pickupDate") || '';
        const getDropoff = localStorage.getItem("dropOffDate") || '';
        const pickTime = localStorage.getItem("pickupTime") || '';
        const dropTime = localStorage.getItem("dropoffTime") || '';

        setReservationDateTime({
            pickupDate: getPickup,
            dropoffDate: getDropoff,
            pickupTime: pickTime,
            dropoffTime: dropTime
        });
    }, []);

    useEffect(() => {
        const { pickupDate, dropoffDate, pickupTime, dropoffTime } = reservationDateTime;

        if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
            const pickupDateTime: Date = new Date(`${pickupDate.split('-').join('-')}T${pickupTime}:00`);
            const droppingDateTime: Date = new Date(`${dropoffDate.split('-').join('-')}T${dropoffTime}:00`);
            const diffInMs: number = Math.abs(droppingDateTime.getTime() - pickupDateTime.getTime());
            const diffInSeconds: number = Math.floor(diffInMs / 1000);
            const days: number = Math.floor(diffInSeconds / (3600 * 24));
            const hours: number = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
            const minutes: number = Math.floor((diffInSeconds % 3600) / 60);

            setDuration(`${days} days, ${hours} hours, ${minutes} minutes`);
        }
    }, [reservationDateTime]);

    return { reservationDateTime, setReservationDateTime, duration };
}

export default useReservationDateTime;

