import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  // title: "Create Next App",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Cab me</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Google Tag Manager */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-SC6DFGZ5D2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SC6DFGZ5D2');
            `,
          }}
        /> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11328482062"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11328482062');
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SC6DFGZ5D2"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SC6DFGZ5D2');`,
          }}
        ></script>
      </head>
      <body className={poppins.className} >
        <Header />

        <div className=" max-w-[1410px] m-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
