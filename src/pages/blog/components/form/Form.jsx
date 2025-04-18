import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Form = ({ type, onSubmit, initialValues }) => {
    const [blog, setBlog] = useState({
        title: '',
        subtitle: '',
        category: '',
        description: '',
        image: null,
        imagePreview: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (initialValues) {
            console.log("Form initialValues:", initialValues);
            setBlog({
                title: initialValues.title || '',
                subtitle: initialValues.subtitle || '',
                category: initialValues.category || '',
                description: initialValues.description || '',
                image: null,
                imagePreview: initialValues.imageUrl || '',
                imageUrl: initialValues.imageUrl || '',
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log("Form input change:", { name, value, files });
        if (name === 'image') {
            const file = files[0];
            setBlog((prev) => ({
                ...prev,
                image: file,
                imagePreview: file ? URL.createObjectURL(file) : prev.imageUrl,
                imageUrl: file ? '' : prev.imageUrl,
            }));
        } else {
            setBlog((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title: blog.title,
            subtitle: blog.subtitle,
            category: blog.category,
            description: blog.description,
            image: blog.image,
            imageUrl: blog.image instanceof File ? '' : blog.imageUrl,
        };
        console.log("Form submit payload:", payload);
        onSubmit(payload);
    };

    return (
        <div className="flex justify-center w-screen h-screen">
            <div className="container my-3 px-4 lg:px-20">
                <div className="w-full p-8 my-2 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl mx-25">
                    <div className="flex">
                        <h1 className="font-bold uppercase text-5xl">{type} Blog</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Title*"
                                name="title"
                                value={blog.title}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Subtitle*"
                                name="subtitle"
                                value={blog.subtitle}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required={type === 'create'}
                            />
                            {blog.imagePreview && (
                                <img src={blog.imagePreview} alt="Preview" className="mt-2 max-w-xs" />
                            )}
                            <input
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Category*"
                                name="category"
                                value={blog.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="my-4">
                            <textarea
                                placeholder="Description*"
                                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                name="description"
                                value={blog.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button
                                type="submit"
                                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Form.propTypes = {
    type: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
};

export default Form;