"use client";

import { Box } from "@chakra-ui/react";
import { MainLayout } from "@/layouts/MainLayout"
import { HomePage } from "../components/homePages"

export default function Page() {
  return (
    <Box bg="white" w="full" minH="100vh">
      <MainLayout>
        <HomePage />
      </MainLayout>
    </Box>
  );
}
1