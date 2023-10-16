import { useState } from 'react'
import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { Container, Form, Button } from 'react-bootstrap';

const Login: NextPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // Aquí se enviarían los datos a la API para iniciar sesión
    //     const response = await fetch('http://localhost:8000/api/v1/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username, password })
    //     });

    //     const data = await response.json();

    //     // Aquí puedes manejar la respuesta, como guardar el token, redirigir al usuario, etc.
    // };

    return (
        <Layout title="Login">
            <>
                <Container>
                    <h2>Login</h2>
                    <Form onSubmit={() => { }}>
                        {/* <Form onSubmit={handleSubmit}> */}
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </>
        </Layout>
    )
}

export default Login;