import type { Metadata } from "next";
import Header from "./components/Header";
import ReduxProvider from "./components/ReduxProvider";
import QueryComponent from "./components/QueryComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientBootstrap from "./components/Bootstrap";

export const metadata: Metadata = {
  title: "Конвертер Валют",
  icons: {
    icon: '/bank_dollar_4336.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <QueryComponent>
          <body>
            <Header />
            <main>
              {children}
            </main>
          </body>
        </QueryComponent>
      </ReduxProvider>
    </html>
  );
}
