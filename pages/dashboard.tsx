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
import AttackChart from '@/components/page/AttackChart';
import AttacksLineChart from '@/components/page/AttacksLineChart';
import DetectionPieChart from '@/components/page/DetectionPieChart';
import DetectionTypePieChart from '@/components/page/DetectionTypePieChart';
import SoarBlocksCard from '@/components/page/SoarBlocksCard';
import CostTable from '@/components/page/CostTable';
import MapChart from '@/components/page/MapChart';


const Dashboard: NextPage = () => {

    const { sideBarCollapsed } = useContext(LayoutContext);
    const [sideBarColumns, setSideBarColumns] = useState(0);
    const [contentColumns, setContentColumns] = useState(0);

    useEffect(() => {
        if (sideBarCollapsed) {
            setSideBarColumns(1);
            setContentColumns(11);
        } else {
            setSideBarColumns(2);
            setContentColumns(10);
        }
    }, [sideBarCollapsed])


    // const [user, setUser] = useState<User | null>(null);
    // const { isDarkTheme } = useContext(LayoutContext);


    return (
        <Layout title="Home">
            <Container fluid>
                <Row>
                    <Col xs={12} md={sideBarColumns} lg={sideBarColumns} xl={sideBarColumns} xxl={sideBarColumns}>
                        <SidebarComponent />
                    </Col>
                    <Col style={{ padding: '40px' }} xs={12} md={contentColumns} lg={contentColumns} xl={contentColumns} xxl={contentColumns}>
                        <div className="row">
                            <div className="col-12"><h2>Summary</h2>
                            <hr />
                            </div>
                        </div>
                        <div className="row" style={{height: '80vh' }}>
                            <div className="col-12" style={{ height: '70vh' }}>
                                <div className="row" style={{ height: '100%' }}>
                                    <div className="col-12 col-lg-6" >
                                        <div className="row" style={{ height: '100%' }}>
                                            <div className="col-6">
                                                <AttackChart/>
                                                <CostTable/>
                                            </div>
                                            <div className="col-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <SoarBlocksCard/>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="col-12 col-lg-6">
                                        <div className="row" style={{ height: '100%' }}>
                                            <div className="col-12" >
                                                <div className="row" style={{ height: '100%' }}>
                                                    <div className="col-6">
                                                        <DetectionPieChart/>
                                                    </div>
                                                    <div className="col-6">
                                                        <DetectionTypePieChart/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12" >
                                                <AttacksLineChart/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-12" style={{ height: '80vh' }}>
                                <MapChart/>
                            </div> */}
                        </div>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}


// export async function getServerSideProps() {
//     return {
//         redirect: {
//             destination: '/login',
//             permanent: false,
//         },
//     };
// }


//export default Home;
export default withAuthGuard(Dashboard);