'use client'

import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Siren, Bot, Scale, User2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function M3SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
    { label: 'Emergency', href: '/emergency-response', icon: <Siren /> },
    { label: 'AI Tools', href: '/ai-tools', icon: <Bot /> },
    { label: 'Legal', href: '/legal-reference', icon: <Scale /> },
    { label: 'Account', href: '/account', icon: <User2 /> },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      paddingTop: '16px',
    }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={pathname.startsWith(item.href)}
              onClick={() => handleNavigation(item.href)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
