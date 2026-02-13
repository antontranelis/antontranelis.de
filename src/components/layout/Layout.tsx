import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative z-[1]">
      <Header />
      <main className="flex-grow mx-auto max-w-5xl w-full px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
