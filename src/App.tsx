import Book from './pages/Book/Book';
import './index.css';

export const App = () => {
  return (
    <main className="bg-slate-100 flex flex-col items-center font-thin">
      <header className="bg-white w-screen h-16 border-b-2 border-indigo-700">Шапочка</header>
      <Book />
      <footer className="bg-white mt-20 w-screen h-16 border-t-2 border-indigo-700">Футер</footer>
    </main>
  );
};
