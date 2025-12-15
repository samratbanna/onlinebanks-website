import { useState, useEffect } from "react";
import { Box, Button, Center, position, useDisclosure } from "@chakra-ui/react";
import { Header } from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { Footer } from "./Footer"

export const MainLayout = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [headerHeight, setHeaderHeight] = useState()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const handleScroll = () => {
      const position = document.documentElement.scrollTop;
      if (position > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      <Header setHeaderHeight={setHeaderHeight} />
      <Box mt={headerHeight + "px"} minH={"100vh" - (headerHeight + "px")}>{props.children}</Box>
      <Footer />
      {isVisible && (
        <Center
          onClick={scrollToTop}
          scrollBehavior="smooth"
          w="40px"
          h="40px"
          borderRadius="50%"
          bgGradient="linear(45deg, buttonGradiant1, buttonGradiant2)"
          _hover={{ bg: "defaultColor.700" }}
          zIndex={99}
          color="white"
          pos="fixed"
          boxShadow="0 2px 3px rgba(0, 0, 0, 0.2)"
          transition="all .5s"
          bottom="20px"
          right="30px"
        >
          <IoIosArrowUp fontSize="20px" />
        </Center>
      )}
    </Box>
  );
};
