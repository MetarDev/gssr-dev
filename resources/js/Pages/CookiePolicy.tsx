import { Text } from "@chakra-ui/react";
import BasicPageLayout from "@/Layouts/BasicPageLayout";
import { Metadata } from "@/types/meta";

export default function CookiePolicy({
  metadata,
}: {
  metadata: Metadata,
}) {
  return (
    <BasicPageLayout meta={metadata}>
      <Text>Our cookie policy is really simple! We don't use any non-functional cookies.</Text>
    </BasicPageLayout>
  );
}
