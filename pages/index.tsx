import { useEffect, useState } from 'react';
import { NextPage, GetStaticProps, GetServerSideProps  } from 'next';
import { useRouter } from 'next/router';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from '../components/layouts';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { User } from '@/interfaces';

const Index: NextPage = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/api/v1/user');
            const data = await res.json();
            setUser(data);
        }
        fetchData()
    }, [])
    

    return (
        <Layout title="Home">
            {/* <div>
                <h1>{ homeTranslate('title-page') }</h1>
                <h2>{ commonTranslate('text-test') }</h2>
            </div> */}
            <>
                <Container className="mt-5">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            {user && (
                                <Card>
                                    <Card.Header>User Information</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>
                                            Username: {user.username}
                                        </Card.Text>
                                        <Card.Text>
                                            Password <b>(no hashed)</b>: {user.password}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>
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


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // Aquí, haz una solicitud a tu backend para obtener el nombre de usuario.
//     // Por ejemplo:
//     const res = await fetch('http://localhost:8000/api/v1/user');
//     const data = await res.json();
//     console.log(res)
//     return { props: { username: data.username } };
//   }

export default Index;