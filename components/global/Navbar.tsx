// components/Navbar.tsx
import { useContext, useState, FC } from 'react';
import { useRouter } from 'next/router';
import Switch from '@material-ui/core/Switch';
import { LayoutContext } from '@/context/layout';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, ButtonGroup } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar: FC = () => {

    const router = useRouter()
    const { isDarkTheme = true, setIsDarkTheme, isLogged, setIsLogged, sideBarCollapsed, setIsCollapsedSidebar } = useContext(LayoutContext);

    const onChangeIsDark = () => {
        console.log(isDarkTheme, isLogged);
        setIsDarkTheme(!isDarkTheme);
    };

    const onClickMenuIcon = () => {
        setIsCollapsedSidebar( !sideBarCollapsed )
    }

    const onClickLogout = () => {
        setIsLogged( false );
        localStorage.removeItem('token');
        router.push('/home');
    }

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>  
            {
                isLogged ? <Button onClick={ onClickMenuIcon } variant="text">{ isLogged ? <MenuIcon/> : undefined }</Button> : undefined
            }
            <ButtonGroup variant="text" aria-label="text button group">
                <Switch
                    checked={isDarkTheme}
                    onChange={onChangeIsDark}
                    name="themeSwitch"
                    inputProps={{ 'aria-label': 'switch theme' }}
                />
                {
                    isLogged ? <Button onClick={ onClickLogout } variant="text"><ExitToAppIcon/></Button> : undefined
                }
            </ButtonGroup>
        </nav>
    );
};

export default Navbar;
