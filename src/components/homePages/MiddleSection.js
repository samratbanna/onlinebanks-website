import { AspectRatio, Box, Center, HStack, Image, Text } from "@chakra-ui/react"



const SubSectionData = [
    {
        title:"Experienced Sales Experts",
        desc:"A dedicated, highly trained, and experienced team of experts works tirelessly every minute to help you make the best financial decisions.",
        imageSrc:"assets/sales2.png"
    },
    {
        title:"Real Time Status Tracking",
        desc:"Our end-to-end loan tracking and quick query resolution is easily accessible across multiple devices. Now, get real-time application status updates with a single tap.",
        imageSrc:"assets/sales.png"
    },
    {
        title:"Widest Choice For Best Deals",
        desc:"With over 125 partnerships, including India’s largest banks, NBFCs, and fintechs, Apnapaisa offers you more than 200 financial products to choose from.",
        imageSrc:"assets/sales3.png"
    },
    {
        title:"Safe & Secure Systems",
        desc:"Onlinebanks understands the importance of protecting your data and privacy. Our industry-leading systems and controls ensure that your information remains secure.",
        imageSrc:"assets/sales1.png"
    },
    
]

export const MiddleSection = () => {
    return (



        <Box display="flex" px={{ base: 3, md: 5 }} bg="red.50" w="100%" flexDir="column" alignItems="center">
            <Text fontWeight={700} py={4} pt={20} fontSize={{ base: 24, md: 30, lg: 34, xl: 34 }} textAlign="center"> What makes online banks, truly online banks</Text>
            <Box w={{ base: "100%", xl: "65%", lg: "75%" }} py={10}>

                {
                    SubSectionData.length>0 && SubSectionData.map((data)=> <SubSection key={data.title} imageSrc={data.imageSrc} title={data.title} desc={data.desc} /> )

                }
                {/* <SubSection src='assets/sales.png' />
                <SubSection src='assets/sales1.png' />
                <SubSection src='assets/sales2.png' />
                <SubSection src='assets/sales3.png' /> */}
            </Box>
        </Box>
    )
}

export const SubSection = ({ title,desc, imageSrc }) => {
    return (
        <Center justify="center">
            <HStack spacing={3} align={{ md: "center", lg: "start" }} my={8} w={{ base: "95%", md: "75%", lg: "80%", xl: "80%" }}>
                
                <Box w={{ base: '50%', sm: '50%', md: '60%', xl: '70%' }}>
                    <Text fontWeight="700" fontSize={{ base: 18, md: 18, lg: 21, xl: 22 }}>{title}</Text>
                    <Text mt={{ base: "5%", lg: "3%", md: "3%" }} fontSize={{ base: 16, md: 16, lg: 16, xl: 18 }} color="textColor" >
                        {desc}
                    </Text>
                </Box>

                <Box w={{ base: '50%', sm: '50%', md: '40%', xl: '30%' }} display='flex' justifyContent='center' alignItems='center'>
                    <AspectRatio ratio={1} minW={{ base: "140px", sm: "140px", md: "140px", lg: "160px", xl: "180px" }}>
                        <Image src={imageSrc} w="100%" alt="" objectFit="contain" />
                    </AspectRatio>
                </Box>

            </HStack>
        </Center>
    )
} 