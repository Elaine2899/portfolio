import json
import re
from html.parser import HTMLParser

class ProjectHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = {
            "title": "",
            "tech": "",
            "nature": "",
            "intro": "",
            "sections": []
        }
        self.current_tag = None
        self.current_section = None
        self.current_subsection = None
        self.current_list_items = None
        self.in_title = False
        self.in_tech = False
        self.in_nature = False
        self.in_intro = True # Accumulate text before first h3
        self.accumulated_text = []

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)
        
        # Flush accumulated text if switching elements
        if tag in ['h2', 'h3', 'h4', 'ul', 'ol', 'p', 'pre']:
            self.flush_text()

        if tag == 'h2' and 'modal-project-title' in attrs_dict.get('class', ''):
            self.in_title = True
        elif tag == 'div' and 'modal-project-tech' in attrs_dict.get('class', ''):
            self.in_tech = True
        elif tag == 'p' and self.in_intro:
            # We will check if it starts with "專案性質："
            self.in_nature = True
        elif tag == 'h3':
            self.in_intro = False
            self.current_section = {
                "heading": "",
                "items": [],
                "subsections": []
            }
            self.result["sections"].append(self.current_section)
        elif tag == 'h4':
            self.current_subsection = {
                "title": "",
                "items": []
            }
            if self.current_section:
                self.current_section["subsections"].append(self.current_subsection)
        elif tag in ['ul', 'ol']:
            self.current_list_items = []

    def handle_endtag(self, tag):
        self.flush_text(tag)
        if tag == 'h2':
            self.in_title = False
        elif tag == 'div':
            self.in_tech = False
        elif tag == 'p':
            self.in_nature = False
        elif tag in ['ul', 'ol']:
            if self.current_list_items is not None:
                items = self.current_list_items
                self.current_list_items = None
                if self.current_subsection:
                    self.current_subsection["items"].extend(items)
                elif self.current_section:
                    self.current_section["items"].extend(items)
                else:
                    # Top level intro lists
                    pass

    def handle_data(self, data):
        if self.in_title:
            self.result["title"] += data
        elif self.in_tech:
            self.result["tech"] += data
        else:
            self.accumulated_text.append(data)

    def flush_text(self, closing_tag=None):
        text = "".join(self.accumulated_text).strip()
        self.accumulated_text = []
        if not text:
            return

        if self.in_nature and "專案性質：" in text:
            # Strip prefix
            cleaned = text.replace("專案性質：", "").strip()
            self.result["nature"] = cleaned
            self.in_nature = False
        elif self.in_nature and "職位：" in text:
            cleaned = text.replace("職位：", "").strip()
            self.result["nature"] = cleaned
            self.in_nature = False
        elif self.current_tag == 'li' and self.current_list_items is not None:
            self.current_list_items.append(text)
        elif self.current_tag == 'h3' and self.current_section:
            self.current_section["heading"] = text
        elif self.current_tag == 'h4' and self.current_subsection:
            self.current_subsection["title"] = text
        elif self.current_tag == 'pre':
            # Preformatted text like n8n schema or code
            code_block = f"<pre><code>{text}</code></pre>"
            if self.current_section:
                self.current_section["items"].append(code_block)
            else:
                self.result["intro"] += code_block
        elif self.in_intro:
            if self.result["intro"]:
                self.result["intro"] += "\n" + text
            else:
                self.result["intro"] = text
        elif self.current_section:
            # Paragraph inside section
            if self.current_subsection:
                self.current_subsection["items"].append(text)
            else:
                self.current_section["items"].append(text)

def clean_html_markup(text):
    # Standard cleanups
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def main():
    with open('/Users/yy/Documents/Portfolio/public/assets/projects-data.json', 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    structured_data = {}
    for key, html_content in raw_data.items():
        # Replace code markup with custom tags or preserve them
        # Let's preserve simple highlights by escaping and keeping strong / code / pre
        # Actually html.parser handles standard entities. Let's do a basic parse:
        parser = ProjectHTMLParser()
        # Pre-wrap list items so they are parsed cleanly
        # Replace <li>...</li> content so it doesn't get split by inner HTML tags like <strong>
        # Let's temporarily protect <strong>, <code>, etc. during parsing
        html_to_parse = html_content
        # Let's run parser
        parser.feed(html_to_parse)
        
        # Post-process title/tech cleanup
        parser.result["title"] = clean_html_markup(parser.result["title"])
        parser.result["tech"] = parser.result["tech"].replace("技術棧：", "").strip()
        parser.result["nature"] = clean_html_markup(parser.result["nature"])
        parser.result["intro"] = clean_html_markup(parser.result["intro"])
        
        # Clean section elements
        for sec in parser.result["sections"]:
            sec["heading"] = clean_html_markup(sec["heading"])
            sec["items"] = [clean_html_markup(item) for item in sec["items"] if item.strip()]
            for sub in sec["subsections"]:
                sub["title"] = clean_html_markup(sub["title"])
                sub["items"] = [clean_html_markup(item) for item in sub["items"] if item.strip()]
            
            # Clean up empty subsections array
            if not sec["subsections"]:
                del sec["subsections"]

        structured_data[key] = parser.result

    with open('/Users/yy/Documents/Portfolio/public/assets/projects-data-structured.json', 'w', encoding='utf-8') as f:
        json.dump(structured_data, f, ensure_ascii=False, indent=4)

    print("Conversion complete! Output saved to projects-data-structured.json")

if __name__ == '__main__':
    main()
