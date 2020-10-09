import React from 'react'

/*
*
** The HtmlHead component is included into the html.js file, to always be loaded.
* The purpose of this file is to provide a default Title value,
* ensure that favicons are provided from Stanford's media source, particularly for browser tab and phone home screens.
*
*/

const HtmlHead = (props) => {
  return (
    <>
    <title>Giving to Stanford</title>
    <link rel="apple-touch-icon" sizes="57x57" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="//www-media.stanford.edu/assets/favicon/apple-touch-icon-180x180.png" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-192x192.png" sizes="192x192" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-128.png" sizes="128x128" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="//www-media.stanford.edu/assets/favicon/favicon-16x16.png" sizes="16x16" />

    <link rel="mask-icon" href="//www-media.stanford.edu/assets/favicon/safari-pinned-tab.svg" color="#ffffff" />
    <meta name="application-name" content="Stanford University"/>
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="//www-media.stanford.edu/assets/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="//www-media.stanford.edu/assets/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="//www-media.stanford.edu/assets/favicon/mstile-150x150.png" />
    <meta name="msapplication-square310x310logo" content="//www-media.stanford.edu/assets/favicon/mstile-310x310.png" />
    <meta name="robots" content="noindex" />
    </>
  )
}

export default HtmlHead;
