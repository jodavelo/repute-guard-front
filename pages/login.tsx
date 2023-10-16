import React from 'react'
import { NextPage } from 'next';
import { Layout } from '@/components/layouts';

const Login: NextPage = () => {


    return (
        <Layout title="Login">
            {/* <div>
                <h1>{ homeTranslate('title-page') }</h1>
                <h2>{ commonTranslate('text-test') }</h2>
            </div> */}
            <>
                <h1>Login</h1>
                {/* <SignUp/> */}
                {/* <VideoProvider>
                    <VideoContainer/>
                </VideoProvider> */}
            </>
        </Layout>
    )
}

export default Login;