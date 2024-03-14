import { useState } from 'react';
import Calendar from 'react-calendar';

function Calendarr() {
    const [value, onChange] = useState(new Date());

    return (
        <div className='flex items-center justify-center h-screen'>
            <Calendar className="bg-primary-gray py-12 text-center space-y-6" onChange={onChange} value={value} />
        </div>
    );
}

export default Calendarr