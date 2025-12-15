import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react"

export const LimitedOffer = () => {
    return (
        <Box mt={12} px={{base:3, md:5}} mb={6} display="flex" flexDir="column" alignItems="center">
            <Box w={{ base: "100%", lg: "65%" }} borderRadius="md" boxShadow="0 5px 30px rgb(66 75 104 / 7%)">
                <HStack justify="space-between">
                    <VStack spacing={6} justify="space-between" align="start" px={{base:3, lg:4, xl:6}} py={{base:2, lg:2, xl:6}}>
                        <Box bg="defaultColor.50" fontSize={12} lineHeight="28px" pos="relative" letterSpacing="1px" fontWeight={700} color="defaultColor.500" pl="3%" pr="2%" borderRadius="5px 0 0 5px"
                            _after={{
                                content: '""',
                                height: 0,
                                width: 0,
                                borderStyle: "solid",
                                pos: "absolute",
                                borderWidth: "15px 14px 14px 0",
                                borderColor: "#ffc7c8 transparent",
                                right: "-13px"
                            }}
                        >
                            Limited Offer
                        </Box>
                        <Box>
                            <Text fontSize={{base:"14px", md:"20px", lg:"20px", xl:"23px"}}>
                                Home Loans now at
                                <span style={{ fontWeight: "bold" }}> Lowest Interest Rates</span>
                            </Text>
                        </Box>
                    </VStack>
                    <Center w={{base:"36%", md:"25%", lg:"30%"}} borderRadius="150px 6px 6px 0px" py={{base:5, md:6, lg:6}} bg="defaultColor.50">
                        <Box ml={{base:"20%",lg:"26%"}}>
                            <Text fontSize={14}>starting from </Text>
                            <Text mt={"16%"} fontWeight="semibold" fontSize={{base:20, md:30, lg:34}}>8.50%</Text>
                        </Box>
                    </Center>
                </HStack>
            </Box>
        </Box>
    )
}