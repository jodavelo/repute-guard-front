import React, { FC, useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@/context/layout';
import { toast } from 'react-toastify';

const SelectComponent: FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('ioc');
    const [request, setRequest] = useState('historical');
    const [data, setData] = useState();

    const { isDarkTheme, setIsLogged } = useContext(LayoutContext);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        // console.log(selectedOption)
        if( selectedOption == 'ioc' ) setRequest('historical')
        if( selectedOption == 'reputation' ) setRequest('reputation')
        if( selectedOption == 'sp' ) setRequest('terminate')

    }, [ selectedOption ])

    useEffect(() => {
        fetch(`http://localhost:8000/filter_select/${ request }`)
            .then(response => response.json())
            .then(data => setData(data.message))
        .catch(error => console.error('Error:', error));
        //console.log('141646161', data)
    }, [ request ])

    useEffect(() => {
        if( data == 'historical' ) {
            toast.info('Service indicators of Compromise started successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkTheme ? "dark" : "light",
            });
        }
        else if( data == 'reputation' ) {
            toast.info('Service IP reputation started successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkTheme ? "dark" : "light",
            });
        }else {
            toast.info(data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkTheme ? "dark" : "light",
            });
        }
    }, [data])

    return (
        <div>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="ioc">IP - Indicators of Compromise</option>
                <option value="reputation">IP - Reputation</option>
                <option value="sp">Stop process</option>
            </select>
        </div>
    );
};

export default SelectComponent;
