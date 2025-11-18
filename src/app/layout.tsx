import "@/styles/globals.css";

export const metadata = {
  title: "SaaS Starter",
  description: "Next.js SaaS starter template",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
