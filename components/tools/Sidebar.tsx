import React, { useState, useContext } from 'react'
import Link from 'next/link';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { LayoutContext } from '@/context/layout';

export const SidebarComponent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isDarkTheme, sideBarCollapsed } = useContext(LayoutContext);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }
    

    return (
        <Sidebar backgroundColor={ isDarkTheme ? "#292929" : "#fff" }
            style={{ height: "100vh" }}
            rtl={false}
            collapsed={ sideBarCollapsed }
            toggled={ true }
            width='110%'
        >
            <Menu
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                      if (level === 0) {
                        return {
                          color: disabled ? "#eee" : "#455A64",
                          backgroundColor: undefined,
                          "&:hover": {
                             backgroundColor: isDarkTheme ? "#fff !important" : "#292929 !important",
                             color: isDarkTheme ? "black !important" : "white !important",
                             borderRadius: "5px !important",
                            //  fontWeight: "bold !important"
                           },
                        };
                      }
                    },
                  }}
            >
                <MenuItem active={ true } component={<Link href="/dashboard" />}> Dashboard</MenuItem>
                <MenuItem active={ true } component={<Link href="/malicious-ips" />}> Malicious IPs</MenuItem>
                <MenuItem component={<Link href="/false-negatives" />}> False - Negatives</MenuItem>
                <MenuItem component={<Link href="/false-positives" />}> False - Positives</MenuItem>
                <MenuItem component={<Link href="/settings" />}> Settings </MenuItem>
                {/* <MenuItem component={<Link href="/ip-detail" />}> E-commerce</MenuItem> */}
            </Menu>
        </Sidebar>
    );
}
