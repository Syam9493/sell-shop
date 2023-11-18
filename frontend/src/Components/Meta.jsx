import React from 'react';
import {Helmet} from 'react-helmet-async';

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='kewords' content={keywords}/>
    </Helmet>
  )
};


Meta.defaultProps = {
    title: "Welcome to Proshop",
    description: "we sell the best Products for  cheap",
    keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta