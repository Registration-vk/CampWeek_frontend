import type { Metadata } from "next";

import React from "react";

import { Manrope } from "next/font/google";

import { QueryProvider } from "@/core/providers";

import { UserProvider } from "./context/context";

import styles from "./styles.module.scss";
import "./styles/global.scss";
import { Navbar } from "@/components/ui/Navbar/Navbar";
import { StoreProvider } from "../core/store/StoreProvider/StoreProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Неделя вожатых",
  description: "Описание недели вожатых",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <UserProvider>
        <html lang="ru">
          <body className={manrope.className}>
            <Navbar />
            <QueryProvider>
              <div className={styles.Container}>{children}</div>
            </QueryProvider>
          </body>
        </html>
      </UserProvider>
    </StoreProvider>
  );
}
