import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export async function urlToFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

export async function convertUrlsToFiles(urls: string[]): Promise<File[]> {
  const filePromises = urls.map(async (url) => {
    const filename = url.split("/").pop() || "file";
    const mimeType =
      (await fetch(url).then((res) => res.headers.get("Content-Type"))) ||
      "application/octet-stream";
    return urlToFile(url, filename, mimeType);
  });

  return Promise.all(filePromises);
}

export async function getGeoData() {
  try {
    // Step 1: Get the user's IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    // Step 2: Get the geo data based on the IP address
    const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
    const geoData = await geoResponse.json();

    if (geoData.status !== "success") {
      throw new Error("Failed to fetch geo data");
    }
    return geoData;
    // return {
    //   city: geoData.city,
    //   country: geoData.country,
    // };
  } catch (error) {
    console.error("Error fetching geo data:", error);
    return { city: "", country: "" };
  }
}

export const countries = [
  {
    name: "Bangladesh",
    cities: [
      {
        name: "Dhaka",
      },
    ],
  },
  {
    name: "USA",
    cities: [
      {
        name: "Chicago",
      },
      {
        name: "New York",
      },
    ],
  },
];



export function formatDate(date: string): string {
  return format(date, "yyyy-MM-dd");
}