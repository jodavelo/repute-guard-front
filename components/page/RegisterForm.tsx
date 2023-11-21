// components/RegisterForm.tsx
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { LayoutContext } from '@/context/layout';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const { isDarkTheme, setIsLogged } = useContext(LayoutContext);
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }) 
            });
    
            if (response.ok) {
                const data = await response.json();
                const { message } = data;
                if( message == 'User already exists' ){
                    toast.error('User already exists', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: isDarkTheme ? "dark" : "light",
                    });
                }
                if( message == 'User created successfully' ){
                    router.push('/login');
                    setIsLogged( false );
                    toast.success('User created successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: isDarkTheme ? "dark" : "light",
                    });
                }
                //console.log(message);
            } else {
                console.error("Error to register email");
            }
        } catch (error) {
            console.error("Error to connect with the server", error);
        }
    };

    return (
        <Card className="p-4">
            <Card.Body>
                <Card.Title>Please enter your email address to register.</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" className='mt-2' type="submit">
                        Register
                    </Button>
                </Form>
                <Card.Text className="mt-2">
                    Already registered?
                    <Link href="/login" passHref>
                        Click here to log in.
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RegisterForm;
