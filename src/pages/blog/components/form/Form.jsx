// import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const Form = ({ type, onSubmit, initialValues }) => {
	const [blog, setBlog] = useState({
	  title: "",
	  subtitle: "",
	  category: "",
	  description: "",
	  image: null,
	  imagePreview: ""
	});

	// Initialize form with existing values
	useEffect(() => {
		if (initialValues) {
		  setBlog({
		    title: initialValues.title,
		    subtitle: initialValues.subtitle,
		    category: initialValues.category,
		    description: initialValues.description,
		    image: initialValues.image,
		    imagePreview: initialValues.image // Show existing image
		  });
		}
	    }, [initialValues])
	    
	    const handleChange = (e) => {
		const { name, value, files } = e.target
		if (name === 'image') {
		  const file = files[0]
		  setBlog((prev) => ({
		    ...prev,
		    image: file,
		    imagePreview: file ? URL.createObjectURL(file) : '',
		  }));
		} else {
		  setBlog((prev) => ({ ...prev, [name]: value }))
		}
	    }

	    const handleSubmit = (e) => {
		e.preventDefault();
		// Remove image from required fields
		if (!blog.title || !blog.subtitle || !blog.category || !blog.description) {
		  alert('Please fill in all required fields');
		  return;
		}
		onSubmit(blog);
	    }
  

  return (
      <div className="flex justify-center w-screen h-screen">
      <div className="container my-3 px-4 lg:px-20">
		<div className="w-full p-8 my-2 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl mx-25">
			<div className="flex">
			<h1 className="font-bold uppercase text-5xl">{type} Blog</h1></div>
			<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Title*" name="title" value={blog.title} onChange={handleChange} required />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Subtitle*" name="subtitle" value={blog.subtitle} onChange={handleChange} required/>
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="file" name="image" accept="image/*" onChange={handleChange} required />
				{/* {blog.imagePreview && (
                        <img src={blog.imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                        )} */}
				  {/* {blog.imagePreview ? (
                           <img src={blog.imagePreview} />
                            ) : blog.image ? (
                               <img src={blog.image} /> // Show existing image if no preview
                                ) : null} */}
					  {initialValues?.image && !blog.imagePreview && (
  <img 
    src={initialValues.image} 
    alt="Current" 
    className="w-32 h-32 object-cover rounded-lg mt-2"
  />
)}
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Category*" name="category" value={blog.category} onChange={handleChange} required/>
                  </div>
				<div className="my-4">
					<textarea placeholder="Description*"  className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"  name="description" value={blog.description} onChange={handleChange} required></textarea>
				</div>
				<div className="my-2 w-1/2 lg:w-1/4">
					<button type="submit" className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">Submit</button>
				</div>
				</form>
		</div>	
    </div>

</div>
  )
}

// Props Validation
Form.propTypes = {
	type: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.shape({ // Add this prop type
	  title: PropTypes.string,
	  subtitle: PropTypes.string,
	  category: PropTypes.string,
	  description: PropTypes.string,
	  image: PropTypes.oneOfType([
	    PropTypes.string,
	    PropTypes.instanceOf(File)
	  ])
	})
    };

export default Form