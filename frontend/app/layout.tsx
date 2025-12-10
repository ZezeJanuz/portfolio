import "./globals.css"; // 🔴 AJOUTE ÇA EN HAUT

export const metadata = {
    title: "Portfolio Louise Ducrocq",
    description: "Portfolio développeuse d’applications",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Afacad:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body>{children}</body>
        </html>
    );
}