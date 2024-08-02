export default function handler(req, res) {
  const apiKey = process.env.KEY;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "API key not set in environment variables" });
  }

  res.status(200).json({ apiKey });
}
