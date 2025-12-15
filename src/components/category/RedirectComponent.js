import { Box, Flex, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"

export const RedirectComponent = () => {
    const router = useRouter()
    const params = useSearchParams()
    const _redirect = () => {
        router.push("/")
    }
    const categoryType = params.get("type")
    return (
        <Flex align="center" fontSize={14} letterSpacing={1}>
            <Text color="white" cursor="pointer" fontWeight="semibold" onClick={_redirect}>Home / </Text>
            <Text color="white">{categoryType}</Text>
        </Flex>
    )
}