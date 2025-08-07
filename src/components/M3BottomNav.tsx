'use client'

import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Siren, Bot, Scale, User2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function M3BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
    { label: 'Emergency', href: '/emergency-response', icon: <Siren /> },
    { label: 'AI Tools', href: '/ai-tools', icon: <Bot /> },
    { label: 'Legal', href: '/legal-reference', icon: <Scale /> },
    { label: 'Account', href: '/account', icon: <User2 /> },
  ];

  const [value, setValue] = React.useState(
    navItems.findIndex((item) => pathname.startsWith(item.href))
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(navItems[newValue].href);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}
