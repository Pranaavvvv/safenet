import type React from "react"
import type { Metadata } from "next"
import ClientPage from "./clientpage"

export const metadata: Metadata = {
  title: "SafeNet | Women's Safety Application",
  description:
    "A web application designed to enhance women's safety, provide peace of mind, and empower through technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientPage>{children}</ClientPage>
}


import './globals.css'