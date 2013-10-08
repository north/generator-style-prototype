{
  "title": "Content Strategy: Human Interest Story Content Type",
  "template": "markdown"
}
---

## Human Interest Story

**Description**

* Short to long form text with primary media of emotional stories

**Benefits:**

* *As a* reader, *I want* to connect to the people effected by events in the world *so that* I can identify more closely with those events
* *As a* site owner, *I want* to provide additional engagement opportunities to readers *so that* I can reduce bounce rate and increase ad revenue

**Value:**

* Page Views per Year: 10,000 Page Views per year
* Cost per Ad per 1,000 Page Views: -$0.10
* Revenue per Ad per Year: $200
* *$199 Nett Ad Revenue per Year*

**Attributes:**

* **Title**
	* *Total:* 1
	* *Required:* true
	* *Type:* text input
	* *Character Limit:* 127
	* *Description:* A descriptive title of the content
* **Body**
	* *Total:* 1
	* *Required:* true
	* *Type:* long text input
	* *Character Limit:* false
	* *Description:* Long Form text box of main content
* **Author**
	* *Total:* 1
	* *Required:* true
	* *Type:* reference (person)
	* *Description:* Author who wrote article
* **Published Date**
	* *Total:* 1
	* *Required:* true
	* *Type:* datestamp
	* *Formatting:* mm/dd/yyyy hh:mm
	* *Description:* Date, including hour and minute, of when article was published
* **Summary**
	* *Total:* 1
	* *Required:* true
	* *Type:* text input
	* *Character Limit:* 200
	* *Description:* Summary of article
* **Primary Media**
	* *Total:* 1
	* *Required:* true
	* *Type:* reference (image, video, audio)
	* *Description:* Primary media for article
* **Related Media Gallery**
	* *Total:* 1
	* *Required:* false
	* *Type:* reference (media gallery)
	* *Description:* Related media gallery
* **Taxonomy**
	* *Total:* multiple
	* *Required:* true
	* *Type:* reference (term)
	* *Minimum:* 1
	* *Maximum:* 5
	* *Description:* Taxonomy allows content types to be related to each other in a meta sense
	
**Relationships**

* Person
* Image
* Video
* Audio
* Media Gallery
* Term