import { useState } from 'react';

const useDataSetter = (initialState) => {
    const [show, setShow] = useState(false);

    const toggleDataSetter = () => {
        setShow(!show);
    };

    return {
        show,
        toggleDataSetter,
    };
};

export default useDataSetter;
