// Simple translation API using a free service fallback
export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json()

    // Using MyMemory Translation API (free, no key required)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`,
    )

    const data = await response.json()

    if (data.responseStatus === 200) {
      return Response.json({
        translatedText: data.responseData.translatedText,
      })
    } else {
      return Response.json(
        {
          translatedText: text,
          error: "Translation service temporarily unavailable",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return Response.json({ error: "Failed to translate text" }, { status: 500 })
  }
}
