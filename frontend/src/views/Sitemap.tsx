import { Text } from "@chakra-ui/react";

const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://worldscans.vercel.app/</loc>
        <lastmod>2025-02-24</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://worldscans.vercel.app/manga</loc>
        <lastmod>2025-02-24</lastmod>
        <priority>0.8</priority>
    </url>
</urlset>
`;

export const Sitemap = () => (
    <Text fontFamily="monospace" whiteSpace="pre-wrap">{xmlData}</Text>
);