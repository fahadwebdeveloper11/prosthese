import { useUserContext } from "@/context/AuthContext";
import { styles } from "@/styles/shared/section-link";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

type SectionLinkProps = {
  title: string;
  href: string;
  linkText?: string;
  buttonTitle?: string;
  data: any;
};

const SectionLink = ({
  title,
  href,
  linkText,
  buttonTitle,
  data,
}: SectionLinkProps) => {
  // console.log("questions => ", data);
  const { settings } = useUserContext();

  const handleNavigate = () => {
    router.push({
      pathname: href as any,
      params: { item: JSON.stringify(data) },
    });
  };
  return (
    <View style={[styles.section, settings.darkMode && styles.darkSection]}>
      {title && <Text style={[styles.sectionTitle, settings.darkMode && styles.darkSectionTitle]}>{title}</Text>}
      {/* <TouchableOpacity href={href as any} asChild> */}
      {/* {buttonTitle ?  : <Text>{linkText}</Text>} */}
      <Button
        onPress={handleNavigate}
        title={buttonTitle || (linkText as string)}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default SectionLink;
