{
  "title": "Content Strategy: Article Content Type",
  "template": "markdown"
}
---

## Article

**Description:**

* Short to long form text with possible accompanying images of recent factual stories 

**Benefits:**

* As a reader, I would like the most up-to-date information about the state of the world
* As a site owner, I would like to increase traffic to our site during peak news stories in order to enhance our standing as a world leading news source.

**Value:**

* Page Views per Year: 25,000 Page Views per year
* Cost per Ad per 1,000 Page Views: -$0.10
* Revenue per Ad per Year: $450
* *$447.50 Nett Ad Revenue per Year*

**Chunks:**

* **Title** [1, Required] - A descriptive title of the content. Limited to 127 characters
* **Body** [1, Required] - Long Form text box that accepts plaintext or Markdown.
* **Author** [1, Required] - Reference to Author entity
* **Published Date** [1, Required] - Datestamp of when story was published
* **Summary** [1, Required] - Short summary of article. Limited to 200 characters.
* **Primary Image** [1, Optional] - Primary image for article. Reference to Image  entity
* **Related Images** [Multiple, Optional] - Reference to Image entity.
* **Related Human Interest Story** [Multiple, Optional] - Reference to Human Interest Story entity
* **Taxonomy** [Multiple, 1 Required] - Reference to Term entity to relate Content entities together
