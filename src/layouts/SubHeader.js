import { CONTACTS, SOCIALMEDIA } from "@/constants";
import {
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { map } from "lodash";
import React from "react";
import { CONTENTWIDTH } from "../constants";

export const SubHeader = () => {
  return (
    <HStack align={"center"} bg={"black"}>
      <Flex
        w={CONTENTWIDTH}
        m={"auto"}
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
        gap={3}
        p={{ base: "3", lg: "0" }}
      >
        <HStack>
          <HStack fontSize={"xs"}>
            <Icon as={CONTACTS[0].icon} color={"defaultColor.500"} />
            <a href={`tel:${CONTACTS[0].value}`} target="_blank">
              <Text color={"white"}>{CONTACTS[0].value}</Text>
            </a>
          </HStack>
          <Center h={"5"}>
            <Divider orientation="vertical" />
          </Center>
          <HStack fontSize={"xs"}>
            <Icon as={CONTACTS[1].icon} color={"defaultColor.500"} />
            <a href={`mailto:${CONTACTS[1].value}`} target="_blank">
              <Text color={"white"}>{CONTACTS[1].value}</Text>
            </a>
          </HStack>
        </HStack>
        <HStack fontSize={"sm"} display={{ base: "none", lg: "flex" }}>
          {map(SOCIALMEDIA, (soc, key) => {
            return (
              <a href={soc.value} key={key} target="_blank" title={soc.name}>
                <IconButton
                  px={2}
                  py={3}
                  borderRadius={"none"}
                  bg="rgba(255,255,255,.05)"
                  color={"white"}
                  h={"12"}
                  _hover={{ bg: "rgba(240,240,240,.2)", color: "defaultColor.500" }}
                >
                  <Icon as={soc.icon} boxSize={3} />
                </IconButton>
              </a>
            );
          })}
        </HStack>
        <HStack justify={"right"}>
          <Button {...buttonCSS}>
            <Link href="/get-free-demo" style={{ textDecoration: "none" }}>
              Request a Free Demo
            </Link>
          </Button>
          <Button
            {...buttonCSS}
            onClick={() =>
              window.open(
                "https://nodejsdev.s3.ap-south-1.amazonaws.com/boucher/apna-school-app-brochure.pdf",
                "_blank"
              )
            }
          >
            Download Boucher
          </Button>
          <Button
            {...buttonCSS}
            onClick={() => window.open("https://erp.apnaschoolapp.com/", "_blank")}
          >
            Login
          </Button>
        </HStack>
      </Flex>
    </HStack>
  );
};

const buttonCSS = {
  bg: "defaultColor.500",
  size: "sm",
  px: "5",
  py: "4",
  color: "white",
  fontSize: "xs",
  borderRadius: "3xl",
  fontWeight: 400,
  _hover: { bg: "black", border: "1px solid white" },
};
