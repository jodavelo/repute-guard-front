import React, { FC, useContext, useState, useEffect } from 'react';
import Head from 'next/head';
// import { Topbar, NavbarComponent, Footer } from '../ui';

import styles from './Layout.module.css';
import { LayoutContext } from '../../context/layout';
import { useRouter } from 'next/router';
import Navbar from '../global/Navbar';

interface Props {
    children: React.ReactNode,
    title: string
}

export const Layout: FC<Props> = ({ children, title }) => {

    const [layoutClassName, setLayoutClassName] = useState('');
    const [themeClassName, setThemeClassName] = useState('');
    const router = useRouter();
    const { asPath } = router;
    const {
        isHome,
        setIsHome,
        isDarkTheme
    } = useContext(LayoutContext);
    useEffect(() => {
        if (isHome) setLayoutClassName(styles.home);
        //else if ( isData ) setLayoutClassName( styles.data );
    }, [])

    useEffect(() => {
        if (asPath == '/') {
            setLayoutClassName(styles.index);
            setIsHome(true);
        }
        else if (asPath == '/login') {
            setLayoutClassName(styles.login);
        }
        // else if ( asPath == '/data/surface-context' ) { 
        //     setProp1ForPage1( styles.data );
        //     setBooleanProp2ForPage1( true );
        // }

    }, [asPath])

    useEffect(() => {
        if( isDarkTheme ) {
            setThemeClassName( styles['dark-theme'] )
        }else setThemeClassName( styles['light-theme'] )
    }, [ isDarkTheme ])
    


    if (asPath === '/') {
        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content="Template" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={ themeClassName }>
                    <div className={ layoutClassName }>
                        <Navbar />
                        {children}
                    </div>
                </main>
            </>
        );
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Template" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Topbar/>
            <NavbarComponent/> */}
            <main className={ themeClassName }>
                <div className={ layoutClassName }>
                    <Navbar />
                    {children}
                </div>
            </main>
            {/* <Footer/> */}
        </div>
    )
}

