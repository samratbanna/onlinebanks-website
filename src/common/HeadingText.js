import { Text } from "@chakra-ui/react";
import React from "react";

export const HeadingText = ({ text1, text2 }) => {
  return (
    <Text color="defaultColor.500" fontSize={"35px"} fontWeight={800} mt={2}>
      <span
        style={{
          fontSize: "33px",
          fontWeight: "800",
          marginRight: "10px",
          color: "black",
        }}
      >
        {text1}
      </span>
      {text2}
    </Text>
  );
};
