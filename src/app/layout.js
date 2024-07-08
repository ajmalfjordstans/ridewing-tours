import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Layout from "@/components/layout";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Ridewing Tours",
  description: "Generated by Fjordstans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Layout>
            <Navbar />
            {children}
            <Footer />
        </Layout>
      </body>
    </html>
  );
}
