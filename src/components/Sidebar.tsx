import React from 'react';
import { NavLink } from 'react-router-dom';
import { Newspaper, TrendingUp, HelpCircle, MonitorPlay, Briefcase, Users, Scale, Shield, HelpCircle as FAQ } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
}

export function Sidebar({ darkMode }: SidebarProps) {
  const menuItems = [
    { icon: Newspaper, label: 'All News', path: '/news' },
    { icon: TrendingUp, label: 'Popular', path: '/popular' },
    { icon: HelpCircle, label: 'Ask', path: '/ask' },
    { icon: MonitorPlay, label: 'Show', path: '/show' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Scale, label: 'Legal', path: '/legal' },
    { icon: Shield, label: 'Security', path: '/security' },
    { icon: FAQ, label: 'FAQ', path: '/faq' },
  ];

  return (
    <aside className={`fixed w-64 h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="p-6">
        <NavLink to="/news" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold">Y</span>
          </div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Hacker News
          </h1>
        </NavLink>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg
                    ${isActive 
                      ? 'bg-orange-500 text-white' 
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}