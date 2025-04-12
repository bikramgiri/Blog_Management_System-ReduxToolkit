import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Form from './components/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editBlog, fetchSingleBlog, setSingleBlog, setStatus } from '../../../store/blogSlice';
import STATUSES from '../../globals/status/statuses';

const EditBlog = () => {
    const token = localStorage.getItem('jwt');
    const { singleBlog, status } = useSelector((state) => state.blog);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleBlog(id));
        return () => {
            dispatch(setSingleBlog(null));
        };
    }, [dispatch, id]);

    const handleSubmit = (blogData) => {
        console.log("Submitting blog data:", blogData);
        dispatch(editBlog(id, blogData));
    };

    useEffect(() => {
        if (status.edit === STATUSES.SUCCESS) {
            console.log("Edit successful, refetching and navigating to:", `/blog/${id}`);
            dispatch(fetchSingleBlog(id)).then(() => {
                navigate(`/blog/${id}`);
                dispatch(setStatus({ key: 'edit', value: STATUSES.IDLE }));
            });
        }
    }, [status.edit, navigate, id, dispatch]);

    useEffect(() => {
        if (status.edit === STATUSES.ERROR) {
            console.log("Edit failed");
            alert('Failed to update blog. Please try again.');
            dispatch(setStatus({ key: 'edit', value: STATUSES.IDLE }));
        }
    }, [status.edit, dispatch]);

    if (!token) {
        return <h1>Please login!</h1>;
    }

    return (
        <Layout>
            {status.fetchSingle === STATUSES.LOADING && <div>Loading...</div>}
            {status.fetchSingle === STATUSES.SUCCESS && singleBlog && (
                <Form
                    type="edit"
                    onSubmit={handleSubmit}
                    initialValues={{
                        title: singleBlog.title || '',
                        subtitle: singleBlog.subtitle || '',
                        category: singleBlog.category || '',
                        description: singleBlog.description || '',
                        imageUrl: singleBlog.imageUrl || '',
                    }}
                />
            )}
            {status.fetchSingle === STATUSES.ERROR && <div>Error loading blog data.</div>}
        </Layout>
    );
};

export default EditBlog;