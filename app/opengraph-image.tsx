import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0B0E14",
          color: "#E7E9EE",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#3DDC97",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "#94A0B8",
            }}
          >
            reyansh.dev
          </span>
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {profile.name}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#7C9CFF",
            marginBottom: 24,
          }}
        >
          {profile.title}
        </p>
        <p
          style={{
            fontSize: 22,
            color: "#94A0B8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {profile.summary.slice(0, 180)}...
        </p>
      </div>
    ),
    size
  );
}
