'use client'

import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import Link from 'next/link';

const UserMenu = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const closeDropdown = (e) => {
            if (e.target.closest('.dropdown-menu') === null) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', closeDropdown);
        } else {
            document.removeEventListener('click', closeDropdown);
        }

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [dropdownOpen]);

    return (
        user && (
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="ml-4 p-2 rounded-full bg-gray-200 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    <FaCog className="h-6 w-6" />
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                        <Link href="/dashboard" legacyBehavior>
                            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</a>
                        </Link>
                        <Link href="/dashboard/admin" legacyBehavior>
                            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User Settings</a>
                        </Link>
                    </div>
                )}
            </div>
        )
    );
};

export default UserMenu;
