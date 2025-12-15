import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const PageHeading = ({ title, bgImage }) => {
  return (
    <Box position={"relative"}>
      <Box
        bgImage={bgImage || "/assets/pagehead.jpg"}
        filter={"brightness(60%)"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        minH={"200px"}
      ></Box>
      <Heading
        position={"absolute"}
        color={"white"}
        fontSize={"35px"}
        left={"10%"}
        right={"10%"}
        fontWeight={700}
        textAlign={"center"}
        top={"30%"}
        bottom={"30%"}
      >
        {title || ""}
      </Heading>
    </Box>
  );
};
