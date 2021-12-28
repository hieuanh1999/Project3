import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import siteImage from "../../static/site-image.png";
import { useIntl } from "gatsby-plugin-intl";
/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

// const siteImage = "/site-image.png";

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            title
            name
            siteUrl
            defaultImage
            description
            social {
              name
              url
            }
          }
        }
      }
    }
  }
`;

const SEO = ({ title, description, url, pathname, image }) => {
  const intl = useIntl();
  const results = useStaticQuery(seoQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  // const twitter = site.social.find(option => option.name === 'twitter') || {};

  console.log(site.siteUrl);

  const fullURL = path => (path ? `${site.siteUrl}${path}` : site.siteUrl);

  // const pageTitle = title ? `${title} | ${site.title}` : site.title;
  const pageTitle = title || site.title;
  const localDescription = intl.formatMessage({ id: "meta.description" });
  // const pageDescription = description || site.description;
  const pageDescription = description || localDescription;
  // const pageImage = fullURL(image || siteImage);
  const pageImage = `${site.siteUrl}${image || site.defaultImage}`;
  const pageUrl =
    `${site.siteUrl}${url}` || "https://www.computervision.com.vn/";

  const metaTags = [
    { charset: "utf-8" },
    {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      rel: "canonical",
      href: fullURL(pathname)
    },
    { itemprop: "name", content: pageTitle },
    { itemprop: "description", content: pageDescription },
    { itemprop: "image", content: fullURL(siteImage) },
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: fullURL(siteImage) },
    // { property: 'og:image:width', content: '1080' },
    // { property: 'og:image:height', content: '566' },
    { property: "og:image:alt", content: pageDescription },
    { property: "og:type", content: "website" },
    { property: "og:description", content: pageDescription },
    { property: "og:site_name", content: site.siteName }
  ];

  return (
    <Helmet
      title={pageTitle}
      htmlAttributes={{ lang: intl.locale }}
      meta={metaTags}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string
};

SEO.defaultProps = {
  title: "",
  description: "",
  url: "",
  pathname: "",
  image: null
};

export default SEO;
