import React from 'react'
import { routeName } from '../../utils/constant'
import { Link } from 'react-router-dom'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { stripHTMLTags } from '../../utils/helpers'

const BlogCard = ({title, content, id, category, date, image, columnList, ...props}) => {
  return (
    <div className={`blog-card flex-container ${columnList? "column" : ""}`} {...props}>

        <div className="blog-card-image">
            <img src={image} alt={title} />
        </div>

        <div className="blog-card-content">

            <h1>{title}</h1>
            <p className='blog-content-text'>{columnList? stripHTMLTags(content).slice(0, 50):stripHTMLTags(content).slice(0, 200)}...</p>

            <div className='blog-card-content-details flex-container space-between wrap'>

                <div className='details-one flex-container align-center'>
                    <p>{category}</p>
                    <p className='light'>{date}</p>
                </div>

                <Link className="read-more-link flex-container align-center" to={`${routeName.blog}/${category}/${id}`}>
                    <span className='text'>Read More</span>
                    <span className='icon'><FaLongArrowAltUp /></span>
                </Link>

            </div>

        </div>


      
    </div>
  )
}

export default BlogCard