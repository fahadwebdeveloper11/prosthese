import { styles } from "@/styles/shared/section-link";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

type SectionLinkProps = {
  title: string;
  href: string;
  linkText?: string;
  buttonTitle?: string;
};

const SectionLink = ({
  title,
  href,
  linkText,
  buttonTitle,
}: SectionLinkProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Link href={href as any} asChild>
        {/* {buttonTitle ?  : <Text>{linkText}</Text>} */}
        <Button title={buttonTitle || linkText as string} />
      </Link>
    </View>
  );
};

export default SectionLink;
