import { Metadata } from "@/types/meta";
import { Head } from "@inertiajs/react";

export const PageHead = ({
  meta: {
    title,
    url,
    description,
    image,
  }
}: {
  meta: Metadata
}) => {
  return (
    <Head title={title}>
      <meta name="twitter:title" content={title} />

      <meta
        name="twitter:url"
        content={url}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />
    </Head>
  );
};
