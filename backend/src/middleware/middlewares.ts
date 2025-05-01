import jwt from 'jsonwebtoken';
const JWT_TOKEN = "ABCDEFGHIJKLMN122"


export const authenticateGuest = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });
    const token = authHeader;
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        //@ts-ignore
        req.guest_id = decoded.guest_id;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};


export const authenticateAdmin = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });
    const token = authHeader;
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        //@ts-ignore
        req.admin_id = decoded.admin_id;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};