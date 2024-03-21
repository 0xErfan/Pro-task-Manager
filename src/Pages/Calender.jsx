import { Eventcalendar, getJson, setOptions, Toast } from '@mobiscroll/react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useCallback, useEffect, useMemo, useState } from 'react';

setOptions({
    theme: 'ios',
    themeVariant: 'dark'
});

function Calendarr() {
    const [myEvents, setEvents] = useState([]);
    const [isToastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    
    const myView = useMemo(
        () => ({
            calendar: { type: 'month' },
            agenda: { type: 'month' },
        }),
        [],
    );

    const handleToastClose = useCallback(() => {
        setToastOpen(false);
    }, []);

    const handleEventClick = useCallback((args) => {
        setToastMessage(args.event.title);
        setToastOpen(true);
    }, []);

    useEffect(() => {
        getJson(
            'https://trial.mobiscroll.com/events/?vers=5',
            (events) => {
                setEvents(events);
            },
            'jsonp',
        );
    }, []);

    return (
        <>
            <Eventcalendar
                clickToCreate={false}
                dragToCreate={false}
                dragToMove={false}
                dragToResize={false}
                eventDelete={false}
                data={myEvents}
                view={myView}
                onEventClick={handleEventClick}
            />
            <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleToastClose} />
        </>
    );
}

export default Calendarr