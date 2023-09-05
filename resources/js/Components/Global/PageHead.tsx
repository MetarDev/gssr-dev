import { Metadata } from "@/types/meta";
import { Head } from "@inertiajs/react";

export const PageHead = ({
  meta: { title, url, description, image, ogImage, twitterImage },
}: {
  meta: Metadata;
}) => {
  return (
    <Head title={title}>
      {/* OG / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || image} />
      <meta property="og:type" content="article" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage || image} />

      {/* Default meta tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
    </Head>
  );
};
