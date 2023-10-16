// components/Navbar.tsx
import { useContext, useState, FC } from 'react';
import Switch from '@material-ui/core/Switch';
import { LayoutContext } from '@/context/layout';

const Navbar: FC = () => {

    const { isDarkTheme = false, setIsDarkTheme } = useContext(LayoutContext);

    const onChangeIsDark = () => {
        console.log(isDarkTheme);
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <span>TuLogo</span>
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
