'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/blog', label: 'BLOG' },
    { href: '/notes', label: 'NOTES' },
    { href: '/feed', label: '#TWIL' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="relative z-20" style={{
      marginBottom: '20px'
    }}>
      <div className="max-w-5xl mx-auto px-6 py-3 industrial-box" style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fff5fa 100%)',
        borderBottom: '3px dashed #ff85c0',
        boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)'
      }}>
        {/* Site branding */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 metal-frame" style={{
              background: 'linear-gradient(135deg, #ff85c0 0%, #ff69b4 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>♡</div>
            <h1 className="text-xl font-bold chrome-text uppercase tracking-wider">
              PORTFOLIO
            </h1>
          </div>
        </div>

        <div className="metal-divider"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-2 text-xs uppercase tracking-wider transition-all font-bold ${
                pathname === link.href
                  ? 'metal-button'
                  : ''
              }`}
              style={pathname !== link.href ? {
                background: 'linear-gradient(135deg, #fff5fa 0%, #ffe4f0 100%)',
                border: '2px solid #ffc0e0',
                borderRadius: '15px',
                color: '#4d2d52'
              } : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
