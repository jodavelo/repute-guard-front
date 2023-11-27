import { useEffect, useState, useContext } from 'react';
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from '../components/layouts';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { User } from '@/interfaces';
import { LayoutContext } from '@/context/layout';

import { ToastContainer, toast } from 'react-toastify';
import withAuthGuard from '@/components/guard/authGuard';
import { SidebarComponent } from '@/components/tools/Sidebar';


import styles from './home.module.css';
import IPTable from '@/components/page/IPTable';
import SelectComponent from '@/components/page/SelectComponent';
import AttacksTable from '@/components/page/AttacksTable';


const Malicious: NextPage = () => {

    const { sideBarCollapsed } = useContext(LayoutContext);
    const [sideBarColumns, setSideBarColumns] = useState(0);
    const [contentColumns, setContentColumns] = useState(0);

    useEffect(() => {
        if(sideBarCollapsed){
            setSideBarColumns( 1 );
            setContentColumns( 11 );
        }else {
            setSideBarColumns( 2 );
            setContentColumns( 10 );
        }
    }, [ sideBarCollapsed ])
    

    // const [user, setUser] = useState<User | null>(null);
    // const { isDarkTheme } = useContext(LayoutContext);


    return (
        <Layout title="Home">
            <Container fluid>
                <Row>
                    <Col xs={ 12 } md={ sideBarColumns } lg={ sideBarColumns } xl={ sideBarColumns } xxl={ sideBarColumns }>
                        <SidebarComponent/>
                    </Col>
                    <Col style={{ padding: '40px' }} xs={ 12 } md={ contentColumns } lg={ contentColumns } xl={ contentColumns } xxl={ contentColumns }>
                        <div className={ styles['box-home-content'] }>
                            <h3>Table of ips addresses detected as malicious</h3>
                            {/* <IPTable/> */}
                            <AttacksTable/>
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

//export default Malicious;
export default withAuthGuard(Malicious);