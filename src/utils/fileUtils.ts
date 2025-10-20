import { MAX_FILE_SIZE_MB } from "@/constants/file";
import { toast } from "sonner";
import { ProcessedFile } from "../../types";

export async function processFile(
  file: File,
  generatePreview: boolean = false
): Promise<ProcessedFile> {
  let processedFile = file;

  // Handle HEIC conversion
  if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
    try {
      const heic2any = (await import("heic2any")).default;
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });
      processedFile = new File(
        [converted as Blob],
        file.name.replace(/\.heic$/i, ".jpg"),
        { type: "image/jpeg" }
      );
    } catch (error) {
      console.error("HEIC conversion failed:", error);
    }
  }

  const result: ProcessedFile = { file: processedFile };
  if (generatePreview && processedFile.type.startsWith("image/")) {
    result.previewUrl = URL.createObjectURL(processedFile);
  }

  return result;
}

export async function processFiles(
  files: File[],
  generatePreviews: boolean = false
): Promise<ProcessedFile[]> {
  return Promise.all(files.map((file) => processFile(file, generatePreviews)));
}

export function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSizeMB: number = MAX_FILE_SIZE_MB,
  showToast: boolean = true
): { isValid: boolean; error?: string } {
  if (!acceptedTypes.includes(file.type)) {
    const error = `Invalid file format. Accepted formats: ${acceptedTypes.join(
      ", "
    )}`;
    if (showToast) {
      toast.error(error);
    }
    return {
      isValid: false,
      error,
    };
  }

  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    const error = `File too large. Maximum size: ${maxSizeMB}MB`;
    if (showToast) {
      toast.error(error);
    }
    return {
      isValid: false,
      error,
    };
  }

  return { isValid: true };
}

export const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
];

export const DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export function cleanupPreviewUrls(urls: string[]): void {
  urls.forEach((url) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
}
