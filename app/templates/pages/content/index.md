{
  "title": "Content Strategy",
  "template": "markdown"
}
---

Content Strategy is a process by which, through a content audit and examination of business needs, a holistic understanding of a business's content is achieved in order to best serve said business and its users. It is one of the most essential parts to design as it lays the groundwork for each feature that gets developed, be it for a web property, a native app property, a content feed, or any other mode of consumption.

The content strategy process should start with a goal for the design and development process. Each project needs a purpose and by defining a goal at the beginning of the process it becomes easier to identify what will provide the most value and ultimately produce a better end result.

At it's most basic, a content audit is an overview of the different types of content available on your site and what individual pieces make up those pieces of content. This can include different types of media, taxonomy terms, published content types, and content grouping mechanisms. Each item should have a descriptive list of fields and meta information to round out the information that make up that piece of content, including what pieces are required and what pieces are optional. When developing this list, it is important to keep in mind that content no longer exclusively lives on websites and that blobs of content (blocks of HTML formatted text) are not ideal for cross-platform content reusability.

Doing a full content audit will also provide important insights into what content is most valuable to one's users, and therefore most valuable to the site owner. This should be done with the aid of analysis of site analytics and business needs.

Each piece of content in a content audit should include a benefit statement and a value proposition. These are both driven by business needs. A benefit statement is a goal whose progress can be measured towards, such as increasing number of page views or reducing operating costs. A value proposition is a measurement of worth and can be as simple as gross revenue generated, as complex as a comparison of revenue and page views to total development and editorial hours and cost required to produce, to anything in between.

A sample goal and a section of a content audit for a fictitious news organization are presented below.

<hr>

# Goal

In today's fast passed world, we need to be able to quickly and effectively deliver accurate and up-to-date information to our readers in an easy and cross-platform way. To accomplish this, we want to be able to provide a single interface that can be accessed from anywhere by our reporters to be able to easily write new articles and seamlessly distribute them across multiple platforms. 

## Article

**Description:**

* Short to long form text with possible accompanying images of recent factual stories 

**Benefit:**

* As a reader, I would like the most up-to-date information about the state of the world
* As a site owner, I would like to increase traffic to our site during peak news stories in order to enhance our standing as a world leading news source.

**Value:**

* Page Views per Year: 25,000 Page Views per year
* Cost per Ad per 1,000 Page Views: -$0.10
* Revenue per Ad per Year: $450
* *$447.50 Nett Ad Revenue per Year*

**Fields:**

* **Title** [1, Required] - A descriptive title of the content. Limited to 127 characters
* **Body** [1, Required] - Long Form text box that accepts plaintext or Markdown.
* **Author** [1, Required] - Reference to Author entity
* **Published Date** [1, Required] - Datestamp of when story was published
* **Summary** [1, Required] - Short summary of article. Limited to 200 characters.
* **Primary Image** [1, Optional] - Primary image for article. Reference to Image  entity
* **Related Images** [Multiple, Optional] - Reference to Image entity.
* **Related Human Interest Story** [Multiple, Optional] - Reference to Human Interest Story entity
* **Taxonomy** [Multiple, 1 Required] - Reference to Term entity to relate Content entities together

## Human Interest Story

**Description**

* Short to long form text with primary media of emotional stories

**Benifit:**

* As a reader, I would like to connect to the people effected by events in the world
* As a site owner, I would like reduce bounce rate by providing additional engagement opportunities to readers

**Value:**

* Page Views per Year: 10,000 Page Views per year
* Cost per Ad per 1,000 Page Views: -$0.10
* Revenue per Ad per Year: $200
* *$199 Nett Ad Revenue per Year*

* **Title** [1, Required] - A descriptive title of the content. Limited to 127 characters
* **Body** [1, Required] - Long Form text box that accepts plaintext or Markdown.
* **Author** [1, Required] - Reference to Author entity
* **Published Date** [1, Required] - Datestamp of when story was published
* **Summary** [1, Required] - Short summary of article. Limited to 200 characters.
* **Primary Media** [1, Required] - Primary image or video for article. Reference to Image or Video entity
* **Related Media Gallery** [1, Optional] - Reference to Media Gallery entity.
* **Taxonomy** [Multiple, 1 Required] - Reference to Term entity to relate Content entities together