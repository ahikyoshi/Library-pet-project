// Core
import { Routes, Route } from 'react-router-dom';
// Pages
import { NotFoundError } from './pages/NotFoundError';
import { Catalog } from './pages/Catalog/Catalog';
import { Book } from './pages/Book/Book';
import { NewBook } from './pages/NewBook';
import { Settings } from './pages/Settings';
import { ServerError } from './pages/ServerError';
// Components
import { Layout } from './components/Layout/Layout';
// CSS
import './index.css';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="book/:id" element={<Book />} />
        <Route path="book/new" element={<NewBook />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFoundError />} />
        <Route path="ServerError" element={<ServerError />} />
      </Route>
    </Routes>
  );
};
