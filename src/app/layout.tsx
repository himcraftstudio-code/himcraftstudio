import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
export const metadata: Metadata = { title: { default: "HimCraft Studio | Handmade with Love", template: "%s | HimCraft Studio" }, description: "Discover thoughtful handmade crochet and woollen creations from HimCraft Studio. Custom orders and gifting enquiries welcome.", metadataBase: new URL("https://himcraftstudio.com") };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}