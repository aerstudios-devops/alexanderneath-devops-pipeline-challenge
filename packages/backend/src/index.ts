import express from "express";
import cors from "cors";
import { contactPayloadSchema, sendEmailMock } from "@challenge/lib";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:4321";

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactPayloadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten()
    });
  }

  const payload = parsed.data;
  const emailPath = await sendEmailMock({
    to: "team@example.com",
    subject: "Interview challenge contact submission",
    body: `Name: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`
  });

  return res.status(202).json({
    success: true,
    message: "Payload accepted",
    emailPath
  });
});

app.listen(port, () => {
  console.log(`backend listening on http://localhost:${port}`);
});