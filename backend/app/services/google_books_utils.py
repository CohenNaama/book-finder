import re
import html


def _pick_image(image_links: dict | None) -> str:
    if not image_links:
        return ""
    for key in ["extraLarge", "large", "medium", "small", "thumbnail", "smallThumbnail"]:
        url = image_links.get(key)
        if url:
            return url.replace("http://", "https://")
    return ""


def clean_description(raw_html: str | None) -> str:
    """
    Normalize Google Books HTML-ish description into plain text:
    - <br> -> newline
    - </p> -> blank line
    - <li> -> "• "
    - strip all other tags
    - unescape HTML entities (&amp; -> &)
    - collapse excessive blank lines
    """
    if not raw_html:
        return ""

    text = raw_html
    text = re.sub(r"(?i)<br\s*/?>", "\n", text)
    text = re.sub(r"(?i)</p>", "\n\n", text)
    text = re.sub(r"(?i)<li[^>]*>\s*", "• ", text)
    text = re.sub(r"(?i)</li>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text or ""


def serialize_book(item: dict) -> dict:
    info = item.get("volumeInfo", {})
    images = info.get("imageLinks", {})
    return {
        "id": item.get("id", ""),
        "title": info.get("title", "Unknown"),
        "authors": info.get("authors", []),
        "thumbnail": _pick_image(images),
    }
