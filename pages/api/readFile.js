import fs from 'fs';
import path from 'path';
export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'pages/api/words.txt');
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        res.status(200).json({ content: fileContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reading the file' });
    }
}
