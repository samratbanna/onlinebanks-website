import { AspectRatio, Box, Button, Center, HStack, Image, Text } from "@chakra-ui/react";
import { MainContainer } from "./MainContainer";
import { useState } from "react";
import { useCategoryStore } from "@/store/category";

export const AssociatedInstitute = () => {
    const { productDetail } = useCategoryStore((s) => ({
        productDetail: s.productDetail,
    }));

    const [isToggle, setIsToggle] = useState(false);

    // Determine the number of products to display based on the toggle state
    const displayedProducts = isToggle ? productDetail : productDetail?.slice(0, 4);

    return (
        <MainContainer>
            <Box w="100%">
                <Text fontWeight="bold" fontSize={{ base: 22, md: 30, lg: 34 }} textAlign="center">
                    Associated Financial Institutions
                </Text>
                <Text color="textColor">
                    We are amongst the top 3 most preferred channel partners for loans and credit cards, for India&apos;s widest network of Banks, NBFCs and Fintechs.
                </Text>
                <HStack my={8} spacing={0} w="100%" wrap="wrap" justify="center">
                    {
                        displayedProducts?.length > 0 && displayedProducts.map((product) => (
                            <BankComponent key={product._id} src={product?.logo} />
                        ))
                    }
                </HStack>
                <Button size="lg" variant="outline" colorScheme="defaultColor" onClick={() => setIsToggle(!isToggle)}>
                    {`View ${isToggle ? "Less" : "More"}`}
                </Button>
            </Box>
        </MainContainer>
    );
}

const BankComponent = ({ src }) => {
    return (
        <Center
            m="10px"
            borderRadius="15px"
            py={{ xl: "39px", lg: "18px", md: "39px", base: "10px" }}
            px={{ xl: "70px", lg: "30px", md: "39px", base: "10px" }}
            w={{ xl: "23%", lg: "22%", md: "47%", base: "42%" }}
            border="1px solid rgba(39, 49, 82, .3)"
            overflow="hidden" 
        >
            <Center
                w={{ xl: "100%", lg: "100%", md: "60%", base: "80%" }}
                h="112px"
                position="relative" 
            >
                <Image
                    src={src}
                    w="100%"
                    h="100%" 
                    objectFit="cover" 
                    alt="bank"
                />
            </Center>
        </Center>
    );
}
