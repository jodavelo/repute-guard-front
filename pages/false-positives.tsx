import { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';

import { Layout } from '../components/layouts';
import { Container, Row, Col } from 'react-bootstrap';
import { LayoutContext } from '@/context/layout';

import withAuthGuard from '@/components/guard/authGuard';
import { SidebarComponent } from '@/components/tools/Sidebar';


import styles from './home.module.css';
import FalsePositivesTable from '@/components/page/FalsePositivesTable';


const FalsePositivesPage: NextPage = () => {

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
    

    return (
        <Layout title="Home2">
            <Container fluid>
                <Row>
                    <Col xs={ 12 } md={ sideBarColumns } lg={ sideBarColumns } xl={ sideBarColumns } xxl={ sideBarColumns }>
                        <SidebarComponent/>
                    </Col>
                    <Col style={{ padding: '40px' }} xs={ 12 } md={ contentColumns } lg={ contentColumns } xl={ contentColumns } xxl={ contentColumns }>
                        <div className={ styles['box-home-content'] }>
                            <h3>IP addresses not detected as malicious in the CTI</h3>
                            <FalsePositivesTable/>
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default withAuthGuard(FalsePositivesPage);