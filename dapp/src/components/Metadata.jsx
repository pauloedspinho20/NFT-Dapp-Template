import { string } from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import useHtmlLang from 'hooks/useHtmlLang';

const { origin } = window.location;

const Metadata = ({ description, image, title }) => {
  const { pathname } = useLocation();
  const url = `${origin}${pathname}`;

  useHtmlLang();

  return (
    <Helmet>
      <title>{ title }</title>
      <meta property="og:title" content={ title } />
      <meta name="twitter:title" content={ title } />

      <link rel="canonical" href={ url } />
      <meta property="og:url" content={ url } />

      <meta property="og:description" content={ description } />
      <meta name="twitter:description" content={ description } />
      <meta name="description" content={ description } />

      { !!image && <meta property="og:image" content={ image } /> }
      { !!image && <meta name="twitter:image" content={ image } /> }

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

Metadata.propTypes = {
  description: string,
  image: string,
  title: string,
};

Metadata.defaultProps = {
  description: process.env.REACT_APP_SITE_DESCRIPTION,
  image: `${origin}/media/share-img.jpg`,
  title: process.env.REACT_APP_SITE_NAME,
};

export default Metadata;
