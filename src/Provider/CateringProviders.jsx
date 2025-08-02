import  { createContext, useEffect, useState } from 'react';

export const ProviderContext = createContext();

const CateringProviders = ({children}) => {
    const [providers, setProviders] = useState([]);
    useEffect(() => {
        fetch('/Provider.json')
            .then(res => res.json())
            .then(data => setProviders(data)) 
    }, [])
    const providerInfo = {
        providers,
        setProviders,
    }
    return (
        <ProviderContext.Provider value={providerInfo}>
            {children}
        </ProviderContext.Provider>
    );
};

export default CateringProviders;