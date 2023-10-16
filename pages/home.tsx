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


const Home: NextPage = () => {

    const [user, setUser] = useState<User | null>(null);
    const { isDarkTheme } = useContext(LayoutContext);
    return (
        <Layout title="Home">
            <>
                <SidebarComponent/>
            </>
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


// export default Home;
export default withAuthGuard(Home);