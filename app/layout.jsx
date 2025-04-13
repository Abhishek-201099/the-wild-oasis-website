// Import the font directly in nextJs.
import { Josefin_Sans } from "next/font/google";

// Then use it to configure the font and attach the className to a element.
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "@/starter/components/Header";

// Export metadata instead of flushing in head tag.
// @@@ '%s' will be replaced by the title in individual pages (if provided) || default will be shown.
// @@@ For favicon, place the icon in the app folder with the name of 'icon'.
export const metadata = {
  // title: "The wild oasis",
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotels, located at the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 antialiased min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
