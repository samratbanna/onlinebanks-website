import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const ReadMoreButton = ({ title = "Read More", route }) => {
  return (
    <Link href={route || "#"}>
      <Button
        size={"lg"}
        fontSize={"xs"}
        bg={"defaultColor.500"}
        color={"white"}
        borderRadius={"100"}
        px={10}
        py={7}
        _hover={{ bg: "gray.900" }}
      >
        {title}
      </Button>
    </Link>
  );
};
