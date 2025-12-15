'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import { customTheme } from "../theme"
// import { AuthProvider } from "../context/auth"
import { CookiesProvider } from 'react-cookie'

const { ToastContainer, toast } = createStandaloneToast({
    theme: customTheme,
});

export const Providers = ({
    children
}) => {
    return (
        <CacheProvider>
            <ChakraProvider theme={customTheme}>
                {/* <AuthProvider> */}
                <CookiesProvider>
                {children}
                </CookiesProvider>
                {/* </AuthProvider> */}
            </ChakraProvider>
        </CacheProvider>
    )
}