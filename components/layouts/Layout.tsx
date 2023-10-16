import React, { FC, useContext, useState, useEffect } from 'react';
import Head from 'next/head';
// import { Topbar, NavbarComponent, Footer } from '../ui';

import styles from './Layout.module.css';
import { LayoutContext } from '../../context/layout';
import { useRouter } from 'next/router';

interface Props {
    children: React.ReactNode,
    title: string
}

export const Layout: FC<Props> = ({ children, title }) => {

    const [layoutClassName, setLayoutClassName] = useState('');
    const router = useRouter();
    const { asPath } = router;
    const { 
        isHome,
        setIsHome
    } = useContext( LayoutContext );
    useEffect(() => {
        if( isHome ) setLayoutClassName( styles.home );
        //else if ( isData ) setLayoutClassName( styles.data );
    }, [])
    
    useEffect(() => {
        if( asPath == '/' ) {
            setLayoutClassName( styles.home );
            setIsHome( true );
        }
        else if( asPath == '/login' ) {
            setLayoutClassName( styles.login );
        }
        // else if ( asPath == '/data/surface-context' ) { 
        //     setProp1ForPage1( styles.data );
        //     setBooleanProp2ForPage1( true );
        // }
            
    }, [ asPath ])

    console.log(asPath)
    
    if (asPath === '/') {
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content="Template" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    {children}
                </main>
            </>
        );
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Head>
                <title>{ title }</title>
                <meta name="description" content="Template" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Topbar/>
            <NavbarComponent/> */}
            <main className={ layoutClassName }>
                { children }
            </main>
            {/* <Footer/> */}
        </div>
    )
}

