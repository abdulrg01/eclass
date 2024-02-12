import Head from "next/head";
import React from "react";

export default function Heading({ title, description, keywords }) {
  return (
    <Head>
      <link rel="shortcut icon" href="/elearning.avif" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  )
}
