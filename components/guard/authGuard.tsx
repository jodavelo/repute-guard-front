import React, { ComponentType, useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

const withAuthGuard = (WrappedComponent: ComponentType) => {
    const WithAuthGuardComponent = (props: PropsWithChildren<any>) => {
        const router = useRouter();
        
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } 
        }, [ router ]);

        return <WrappedComponent {...props} />;
    }

    WithAuthGuardComponent.displayName = 'WithAuthGuardComponent';
    
    return WithAuthGuardComponent;
}

export default withAuthGuard;
