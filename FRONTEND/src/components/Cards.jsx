import React from 'react'

function Cards({ item }) {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto  px-4'>
                <div className="card bg-base-100 w-96 shadow-xl  px-4">
                    <figure>
                        <img
                            src={item.image}
                            alt={item.title} />
                        
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.title}
                            <div className="badge badge-secondary">{item.author}</div>
                        </h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">{item.category}</div>
                        </div>
                    </div>
                </div>
         </div>
        </>
    
  )
}

export default Cards
