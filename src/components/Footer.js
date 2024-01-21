import { Link } from 'react-router-dom';
export const Footer = () => {
    var dynamic_date = new Date().getFullYear();
    
    return (
        <footer className="bg-white shadow dark:bg-gray-900">
            <div className="w-full mx-auto max-w-screen-2xl py-4 px-2 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {dynamic_date} <Link to="/" className="hover:underline">Movie Find™</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 other:justify-center">
                <li>
                    <a href="#" target="_blank" className="hover:underline me-4 md:me-6">Instagram</a>
                </li>
                <li>
                    <a href="#" target="_blank" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="#" target="_blank" className="hover:underline me-4 md:me-6">Youtube</a>
                </li>
                <li>
                    <a href="#" target="_blank" className="hover:underline">Github</a>
                </li>
            </ul>
            </div>
        </footer>
    );
}
