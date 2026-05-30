import { NextRequest, NextResponse } from "next/server";
import { checkAll } from "@/lib/monitor";

// Endpoint del monitor de cupos.
//
// - GET /api/monitor                 -> revisa todas las municipalidades
// - GET /api/monitor?ids=santiago,maipu -> revisa solo esas
//
// Tambien lo ejecuta Vercel Cron (ver vercel.json) de forma periodica. Si quieres recibir
// notificaciones cuando aparezcan cupos, conecta aqui un webhook (correo, Telegram, etc.)
// usando una variable de entorno como NOTIFY_WEBHOOK_URL.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const idsParam = req.nextUrl.searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

  const results = await checkAll(ids);
  const disponibles = results.filter((r) => r.availability === "disponible");

  // Notificacion opcional: solo si configuraste un webhook y hay cupos.
  const webhook = process.env.NOTIFY_WEBHOOK_URL;
  if (webhook && disponibles.length > 0) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:
            "Posibles horas disponibles para la prueba de manejo en: " +
            disponibles.map((d) => `${d.comuna} (${d.url})`).join(", "),
          disponibles,
        }),
      });
    } catch {
      // No interrumpir la respuesta por un fallo de notificacion.
    }
  }

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    total: results.length,
    disponibles: disponibles.length,
    results,
  });
}
