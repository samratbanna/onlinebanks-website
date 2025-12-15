import { SOCIAL_MEDIA } from "@/constants";
import { useCategoryStore } from "@/store/category";
import { Box, Center, HStack, Image, Link, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { map, split } from "lodash";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Footer = () => {
  const { getAppVersionAction, getAppVersionStatus, appDetail, categories } = useCategoryStore(s => ({
    getAppVersionAction: s.getAppVersionAction,
    getAppVersionStatus: s.getAppVersionStatus,
    appDetail: s.appDetail,
    categories: s.categories
  }))
  const params = useSearchParams()
  const categoryId = params.get("id")

  useEffect(() => {
    getAppVersionAction()
  }, [getAppVersionAction])

  const { androidAppLink, iosAppLink } = appDetail || {}
  return (
    <Box>
      <Box px={{ base: 3, md: 5 }} py={10} bg="black" w="100%" display="flex" flexDir="column" alignItems="center">
        <Box w={{ base: "100%", xl: "85%", lg: "85%" }} textAlign="center">
          <Box px={15} justifyContent="space-between" display="flex" flexDir={{ xl: "row", lg: "row", md: "row", base: "column" }}>
            <Box>
              <Text mb={{base:4}} textAlign="start" fontSize={22} fontWeight="semibold" color="white">Online Banks</Text>
            </Box>
            <HStack spacing={4}>
              {map(SOCIAL_MEDIA, social =>
                <Center bg="white" cursor="pointer" borderRadius={100} w={10} h={10}>
                  {social.icon}
                </Center>
              )}
            </HStack>
          </Box>
          <Box my={10} justify="space-between" display="flex" flexDir={{ xl: "row", lg: "row", md: "row", base: "column" }}>
            <FooterContent title="Company">
              <Box my={"16px"}>
                <Text fontSize={16} color="white">
                  50, bhomiya nagar, Kalwar road, Jhotwara, Jaipur(Raj.)
                </Text>
                <Text color="white" mt={2} fontSize={16}>+91-8003183665</Text>
                <Text color="white" fontSize={16}>info@onlinebanks.in</Text>
              </Box>
            </FooterContent>
            <FooterContent title="Category">
              <Box my={"16px"}>
                {map(categories, c => {
                   const isActive = c?._id == categoryId ? true : false
                  const splitName = split(c.name, " ").join("-")?.toLowerCase()
                  return (
                    <Link key={c._id} href={`/category?id=${c._id}&type=${splitName}`}><Text _hover={{ color: "defaultColor.500" }} cursor="pointer" trasition="0.3s" mb={2} fontWeight={400} color={isActive ? "defaultColor.400" : "white"}>{c.name}</Text></Link>
                  )
                }
                )}
              </Box>
            </FooterContent>
            <FooterContent title="Other">
              <Box my="16px">
                <Link href="/privacyPolicy"><Text _hover={{ color: "defaultColor.500" }} cursor="pointer" trasition="0.3s" mb={2} fontWeight={400} color="white">Privacy Policy</Text></Link>
                <Link href="/term-condition"><Text _hover={{ color: "defaultColor.500" }} cursor="pointer" trasition="0.3s" mb={2} fontWeight={400} color="white">Term & Condition</Text></Link>
              </Box>
            </FooterContent>
            <FooterContent title={`Onlinebanks app \n Available on`}>
              <Box display='flex' flexDirection='column' alignItems={{xl:'center'}} textAlign={{base:"start"}}>
                <a target="_blank" href={iosAppLink}>
                  <Image cursor="pointer" w={{ xl: "162px", lg: "150px", md: "140px", base: "152px" }} borderRadius="md" border="1px solid gray" src="/assets/app_store.png" objectFit="contain" alt="app_store" />
                </a>
                <a target="_blank" href={androidAppLink}>
                  <Image mt={3} cursor="pointer" w={{ xl: "162px", lg: "150px", md: "140px", base: "152px" }} borderRadius="md" border="1px solid gray" src="/assets/google_play.png" objectFit="contain" alt="google_play_store" />
                </a>
              </Box>
            </FooterContent>
          </Box>
        </Box>
      </Box>
      <Center p="14px" color="white" bgGradient="linear(45deg, buttonGradiant1, buttonGradiant2)">
        {`© Onlinebanks ${dayjs().format("YYYY")} All rights reserved`}
      </Center>
    </Box>
  );
};

const FooterContent = (props) => {
  const { children, title } = props || {}
  return (
    <Box w={{ xl: "25%", lg: "25%", md: "25%", base: "100%" }} px="15px" textAlign="start">
      <Text  fontWeight={500} fontSize={18} color="white" mb="8px">{title}</Text>
      {children}
    </Box>
  )
}

