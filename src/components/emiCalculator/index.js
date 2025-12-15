import { Box, Flex, HStack, Input, InputGroup, InputLeftElement, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { MainContainer } from "../homePages/MainContainer"
import { MdOutlineCurrencyRupee } from "react-icons/md"

export const EMICalculator = () => {
    return (
        <Box my={0} w="100%">
            <Flex>
                <Box p={8} bg="white" w="33%">
                    <Flex justify="space-between" mb={10} align="center" w="100%">
                        <Text fontSize={16} fontWeight="bold">Loan account</Text>
                        <HStack spacing={1}>
                            <Box color="defaultColor.500"><MdOutlineCurrencyRupee /></Box>
                            <Input w="120px" size="sm" variant="flushed" type='tel' />
                        </HStack>
                    </Flex>
                    <Slider aria-label='slider-ex-2' colorScheme='pink' defaultValue={30}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Box bg="defaultColor.400" w="33%"></Box>
                <Box bg="white" w="33%"></Box>
            </Flex>

        </Box>
    )
}
