import React from 'react';

const About = () => {
    return (
        <div className='w-full flex flex-col px-10'>
            <h1 className='font-bold text-4xl tracking[0.35em] mb-8'>
                About
            </h1>
            <div className='h-[10%]'>
                <img src='lakeDucks2.jpg' alt='none'
                className='flex-1 w-full object-cover object-bottom h-[6em] md:h-[15em] mb-8
                ' />
            </div>
            <div className='space-y-2'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, aut delectus fugit quod porro nihil numquam ad odit libero sit similique cupiditate dolores qui ratione fugiat quisquam voluptatum culpa, quasi deserunt alias voluptates. Aliquam at, modi illo repellat commodi ratione soluta minus odit ut vero ad sequi nostrum! Suscipit, culpa?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio ullam officia vero quaerat debitis officiis cum laborum expedita quam deleniti, incidunt nesciunt, illo optio consectetur, natus excepturi? Sunt, vitae!
                </p>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti eum animi placeat consequuntur deserunt. Illum nesciunt aut voluptatum officia hic impedit quod excepturi expedita voluptate, pariatur magnam, laborum architecto aliquid sequi animi. Doloremque facilis, eum asperiores veritatis sequi illum. Quo.
                </p>
            </div>
            
        </div>
    );
};


export default About;