import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd"
import Footer from "../components/footer/footer"
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

const inter = Inter({ subsets: ["latin"] });

// It uses only for server side page, not client side
// export const metadata = {
//   title: "Membership Platform",
//   description: "A membership app powered by Mitra Mandiri Informatika",
// };

//👇 Configure our font object
// const firaSans = Fira_Sans({ weight: '400', subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={firaSans.className} >
    <html lang="en" >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CustomProvider>
          <ConfigProvider
            theme={{
              components: {
                // Input: {
                //   /* here is your component tokens */
                //   fontSize: "12px",
                //   paddingContentHorizontal: "20px"
                // },
              },
            }}>
            <main>
              {children}
              <div className="flex justify-center text-xs text-[#cccccc] font-medium mb-5">powered by PT Mitra Mandiri Informatika</div>
              <Footer></Footer>
            </main>
          </ConfigProvider>
        </CustomProvider>
      </body>
    </html>
  );
}
