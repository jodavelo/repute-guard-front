import { useState, useContext } from 'react'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layouts';
import { Container, Form, Button } from 'react-bootstrap';
import { LayoutContext } from '@/context/layout';

import styles from './styles.module.css';
import { hashPassword } from '@/helpers';
import { toast } from 'react-toastify';

const Login: NextPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isDarkTheme, setIsLogged } = useContext(LayoutContext);
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevenir recargar la página
        const hashedPassword = await hashPassword(password);
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: hashedPassword
            })
        });

        const data = await response.json();
        const { login } = data;
        console.log(login)

        if (login) {
            router.push('/home');
            setIsLogged( true );
            toast.success('Login Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkTheme ? "dark" : "light",
            });
            localStorage.setItem('token', 'success');
            // console.log(data.message);
        } else {
            toast.error('Username or password incorrect!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkTheme ? "dark" : "light",
            });
            console.error(data.error);
        }
    }

    return (
        <Layout title="Login">
            <>
                <Container>
                    <h2>Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => setUsername(e.target.value)}
                                className={isDarkTheme ? 'dark-placeholder dark-form' : 'light-placeholder'}
                                style={{
                                    backgroundColor: isDarkTheme ? '#636363' : 'white',
                                    color: isDarkTheme ? 'white' : 'black'
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                className={isDarkTheme ? 'dark-placeholder dark-form' : 'light-placeholder'}
                                style={{
                                    backgroundColor: isDarkTheme ? '#636363' : 'white',
                                    color: isDarkTheme ? 'white' : 'black'
                                }}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className={`${styles['submit-button']} ${isDarkTheme ? styles['dark-button'] : ''}`}
                        >
                            Submit
                        </Button>
                    </Form>
                </Container>
            </>
        </Layout>
    );

}

export default Login;