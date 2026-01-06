import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/shared/ScrollToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Ziele from './pages/Ziele';
import Faehigkeiten from './pages/Faehigkeiten';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="article/:slug" element={<BlogPost />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:slug" element={<ProjectDetail />} />
          <Route path="ziele" element={<Ziele />} />
          <Route path="faehigkeiten" element={<Faehigkeiten />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
