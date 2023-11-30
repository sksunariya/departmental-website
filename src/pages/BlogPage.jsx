import { AppContext } from '../services/apiLinks/blogsAPI';
import { useContext, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import BlogHome from '../components/Blogs/BlogHome';
import ShowBlogs from '../components/Blogs/ShowBlogs';
import TagPage from '../components/Blogs/TagPage';
import CategoryPage from '../components/Blogs/CategoryPage';


function BlogPage() {

  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    const page = searchParams.get("page") ?? 1;

    if (location.pathname.includes('tags')){
      const tag = location.pathname.split('/').at(-1).replace('-', ' ');
      fetchBlogPosts(Number(page), tag);
    }
    else if (location.pathname.includes('categories')){
      const category = location.pathname.split('/').at(-1);
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }

  },[location.pathname, location.search])

  return (
      <Routes>
        <Route path='/blogs' element={<ShowBlogs/>} />
        <Route path='/blogs/:blogId' element={<BlogHome/>} />
        <Route path='/blogs/tags/:tag' element={<TagPage/>} />
        <Route path='/blogs/categories/:category' element={<CategoryPage/>} />
      </Routes>
  );
}

export default BlogPage;
