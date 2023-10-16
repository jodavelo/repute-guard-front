// components/Navbar.tsx
import { useContext, useState, FC } from 'react';
import Switch from '@material-ui/core/Switch';
import { LayoutContext } from '@/context/layout';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const Navbar: FC = () => {

    const { isDarkTheme = true, setIsDarkTheme, isLogged, setIsLogged, sideBarCollapsed, setIsCollapsedSidebar } = useContext(LayoutContext);

    const onChangeIsDark = () => {
        console.log(isDarkTheme);
        setIsDarkTheme(!isDarkTheme);
    };

    const onClickMenuIcon = () => {
        setIsCollapsedSidebar( !sideBarCollapsed )
    }

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <Button onClick={ onClickMenuIcon } variant="text">{ isLogged ? <MenuIcon/> : undefined }</Button>
            <Switch
                checked={isDarkTheme}
                onChange={onChangeIsDark}
                name="themeSwitch"
                inputProps={{ 'aria-label': 'switch theme' }}
            />
        </nav>
    );
};

export default Navbar;
