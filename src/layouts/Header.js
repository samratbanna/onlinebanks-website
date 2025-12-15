import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { find, map, split } from "lodash";
import { NAVLINKS } from "../constants";
import { MdArrowDropDown, MdArrowForwardIos, MdOutlineDehaze } from "react-icons/md";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/store/category"
import { CButton } from "@/customLayouts/CButton"
import { handleClientScriptLoad } from "next/script";

export const Header = ({ setHeaderHeight }) => {
  const heightRef = useRef(null)
  // const [isVisible, setVisible] = useState(false);
  const { getCategoryAction } = useCategoryStore(s => ({
    getCategoryAction: s.getCategoryAction,
  }))

  useEffect(() => {
    if (heightRef.current?.clientHeight) {
      setHeaderHeight(heightRef.current?.clientHeight)
    }
  }, [setHeaderHeight])

  useEffect(() => {
    getCategoryAction()
  }, [getCategoryAction])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentPosition = window.pageYOffset;
  //     if (currentPosition <= 22) {
  //       setVisible(true);
  //     } else {
  //       setVisible(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <Box
      w="full"
      display="flex"
      flexDir="column"
      justifyContent="center"
      ref={heightRef}
      boxShadow="2px 12px 16px -10px hsla(0,0%,66%,.5)"
      bg="white"
      pos={"fixed"}
      zIndex={99}
      top={0}
      h={"70px"}
    >
      <NavBar iconColor="defaultColor.500" textColor={"defaultColor.500"} />
    </Box>
  );
};

export const NavBar = ({ icon, textColor, iconColor }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const params = useSearchParams();
  const router = useRouter()
  const categoryId = params.get("id")

  const { categories } = useCategoryStore(s => ({
    categories: s.categories,
  }))

  const handleToRedirect = (categoryId, categoryName) => {
    categoryName = split(categoryName, " ").join("-")
    router.push(`/category?id=${categoryId}&&type=${categoryName?.toLowerCase()}`)
  }

  const handleRedirectToProductLead = () => {
    router.push('/chooseProduct')
  }

  return (
    <Box w="100%">
      <HStack justify={"space-between"} pl={{ base: 3, md: 8, lg: 16 }} pr={3}>
        <Link href={"/"}>
          <HStack spacing={0}>
            <Image
              src={icon ? icon : "/assets/onlineBanks.jpg"}
              alt="Logo"
              w={[{ base: "239px", md: "363px", lg: "225px" }]}
              h={{ lg: "60px", md: "60px", base: "48px" }}
            />
            <Text fontWeight="semibold" fontSize={24} color="defaultColor.400">Online Banks</Text>
          </HStack>
        </Link>
        <HStack spacing={4} display={{ base: "none", lg: "flex" }}>
          {map(categories, category => {
            const isActive = category?._id == categoryId ? true : false
            return (
              <Box key={category} onClick={() => handleToRedirect(category._id, category.name)} fontSize={16} p={2} borderRadius="50" color={isActive ? "defaultColor.400" : "gray.700"} _hover={{ color: "defaultColor.500", transition: "all .3s" }} cursor="pointer">
                {category.name}
              </Box>
            )
          }
          )}
          <Box>
            <CButton onClick={handleRedirectToProductLead}>Apply Now</CButton>
          </Box>
        </HStack>
        <Box display={{ base: "flex", lg: "none" }}>
          <IconButton onClick={() => setShowNavbar(p => !p)}>
            <MdOutlineDehaze />
          </IconButton>
        </Box>
      </HStack>
      {showNavbar && <MobileNavBar />}
    </Box>
  );
};

export const MobileNavBar = () => {
  const path = usePathname();
  const { categories } = useCategoryStore(s => ({
    categories: s.categories,
  }))
  return (
    <Box
      className="mobile-navbar-animation"
      w="100%"
      display={{ base: "column", md: "column", lg: "none" }}
      minH="10vh"
      pos="absolute"
      right={0}
      // left={10}
      bg="white"
      p={1}
      m={"auto"}
      zIndex={999}
      transition="all 1s"
    >
      {map(categories, (category, index) =>
        category.children && category.children.length ? (
          <Box>
            <Flex
              key={category._id}
              role="group"
              // onClick={() => handleChildren(category)}
              cursor="pointer"
              p={1}
              fontWeight="semibold"
              transition="all 0.7s"
              justifyContent="space-between"
              _hover={{ color: "black", bg: "white" }}
            >
              <Link href={category.route}>
                <Text fontSize={"smaller"} _groupHover={{ color: "black" }}>
                  {category.name}
                </Text>
              </Link>

              <MdArrowDropDown />
            </Flex>
            {map(category.children, (n, index) => (
              <Link
                href={`${category.route}/${encodeURIComponent(n.route)}`}
                role="group"
                _hover={{ textDecor: "none" }}
                key={index}
              >
                <Box
                  px={4}
                  transition="all 0.8s"
                  borderLeft="1px solid gray"
                  py={1}
                  _hover={{ bg: "defaultColor.500" }}
                >
                  <Text fontWeight={400} fontSize={"smaller"} _groupHover={{ color: "white" }}>
                    {n.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Box>
        ) : (
          // <Link href={category.route}>
          <Text
            key={category._id}
            // color={path === category.route ? "defaultColor.500" : "black"}
            p={2}
            fontSize={"16"}
            fontWeight="semibold"
            _groupHover={{ color: "black", bg: "defaultColor.500" }}
          // _groupHover={{ color: "black" }}
          >
            {category.name}
          </Text>
          // </Link>
        )
      )}
    </Box>
  );
};
