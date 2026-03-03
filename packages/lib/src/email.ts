import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface MockEmailInput {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmailMock(input: MockEmailInput): Promise<string> {
  const directory = join(process.cwd(), ".tmp-emails");
  await mkdir(directory, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${timestamp}-${Math.random().toString(36).slice(2, 8)}.txt`;
  const fullPath = join(directory, filename);

  const content = [
    `TO: ${input.to}`,
    `SUBJECT: ${input.subject}`,
    "",
    input.body
  ].join("\n");

  await writeFile(fullPath, content, "utf-8");
  return fullPath;
}