import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        padding: '10px 0',
        fontSize: '0.9rem',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        marginTop: 'auto',
      }}
    >
      <div>
        <p>© 2024 One-Flash. All rights reserved.</p>
        <p>
          Check out our project on{' '}
          <Link
            href="https://github.com/vitran75/cs4300_final_project/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#000000',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <FaGithub
              style={{
                marginRight: '8px',
                fontSize: '1.2rem',
              }}
            />
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;