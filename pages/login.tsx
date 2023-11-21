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
        console.log("Usuario:", username);
        console.log("Contraseña:", password);
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword)
        // const response = await fetch(`http://localhost:8000/api/v1/auth/${ username }`);
        // const data = await response.json();
        // console.log( data )
        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password: hashedPassword
            })
        });

        const data = await response.json();

        if (response.status === 200) {
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
            // Mostrar un mensaje de error o realizar alguna otra acción.
        }
    }
    

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