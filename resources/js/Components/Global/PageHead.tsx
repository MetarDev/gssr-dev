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

      {/* Real favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ed8936" />
      <meta name="msapplication-TileColor" content="#2a2524" />
      <meta name="theme-color" content="#2a2524" />
    </Head>
  );
};
