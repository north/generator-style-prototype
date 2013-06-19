{
  "title": "",
  "examples": false
}
---

# Welcome to your Style Prototype

Style Prototypes are a way of visualizing the elements of your design outside of the full page metaphor. They are divided into five fully customizable sections, a [Style Tile](#styletile), an [Element Guide](#elementguide), a [Typography Sample](#typographysample), a [Component Guide](#componentguide), and a [Color Guide](#colorguide). Style Prototypes are a system for [Style Guide Driven Development](https://speakerdeck.com/jina/style-guide-driven-ui-design-with-sass) that can integrate directly into your implementation cycle, allowing your design and development teams to work together seamlessly.

Style Prototypes also provide a new set of deliverables. Instead of static page comps, the prototype website is now a deliverable that can be viewed across browsers and devices to see how each item truly looks. In addition, a [Compass](http://compass-style.org/) Extension can be created of the essence of the prototype, the Style Guide, that can be directly used in any project, including the final implementation.

## Style Tile

[Style Tiles](http://styletil.es/) are "a visual web design process for clients & the responsive web" coined by [Samantha Warren](https://twitter.com/intent/user?screen_name=samanthatoy). To quote the Style Tiles website:

> Style Tiles are a design deliverable consisting of fonts, colors and interface elements that communicate the essence of a visual brand for the web.
>
> They help form a common visual language between the designers and the stakeholders and provide a catalyst for discussions around the preferences and goals of the client.

The biggest difference between the standard Style Tile and the Style Tile developed as part of Style Prototypes is that the ones created as part of the prototype is built in conjunction with the full Style Guide. This means that there is no translation or documentation needed to take a Style Tile and move it into code. Additionally, because the Style Tile is designed in browser and built in code, it can be versioned, so it becomes easy to swap between versions and chunks of styling. It also is all in browser, so all of the colors and typographic styling that is done can be seen how they'll actually appear in browser across browser and devices.

## Element Guide

The element guide is the heart of a Style Guide. The guide is a collection of all basic elements that could be found on a page, from headers to links to lists to tables to form elements. These elements form the basis for all larger components of your website, so having a good set of styling for them is essential for a cohesive look and feel for your website.

## Typography Sample

Typography is the core of modern web development. After all colors and layout have been removed, what you have left is your copy. With the coming of age of web typography, beautiful fonts can now be used on the web. The great advantage of choosing typography in browser is the ability to see how it will truly look with proper kerning and weight across all browsers and devices. The typography sample contains an inline image and an inline embedded video. The copy itself comes from [Fillerama](http://chrisvalleskey.com/fillerama/).

## Component Guide

If the elements in the element guide are the ingredients that make up a site, components are recipes for putting those ingredients together. A component is one or more elements combined and with appropriate classes styled to be used as a cohesive unit. A designer and developer working together to build and style a component guide inside the context of the Style Prototype leads to easy to implement, iterative, reusable, and coherent designs.

## Color Guide

The color guide is fairly straight forward; it's a collection of colors with both their hex value and their Sass value. It serves as a good reference for designers and developers alike as to what the canonical colors of the design are, helping to ensure consistency.