# Theme partials


## Intro to Sass partials

This directory contains includes known as [Sass partials](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#partials). Like PHP, Sass can
"include" files and incorporate them into a larger master file. You can easily
identify a Sass partial because it begins with an underscore, indicating to Sass
that it should not generate a standalone .css file from the original .scss

Beyond that there are no enforced rules. It's up to each team to decide how
they're used.


## How does this theme use partials?

We incorporated the use of Sass partials and the [nesting](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#nested_rules) architecture that Sass
provides to provide a more human-understandable organization to the CSS files.

We've also leveraged the respond-to Sass extension, which allows us to embed
rules involving media queries directly into each component rather than relying
on the extremely encumbering method of grouping styles per media query.

We have set up the CSS so that each file represents a component of the website.
If you are making changes to the Funding section, the styles belong in the
funding partial. If a style should be applied sitewide then place it in one of
the global partials.

**Example**

*Writing this Sass...*

    #block-views-myview {
      padding: 1em;
    
      h2 {
        font-size: 2em;
        color: #fff;
      }
    
      p {
        line-height: 2em;
      }
    }

*Produces this CSS...*

    #block-views-myview {
      padding: 1em;
    }
    
    #block-views-myview h2 {
      font-size: 2em;
      color: #ffffff;
    }
    
    #block-views-myview p {
      line-height: 2em;
    }


## Benefits

The files are organized into a pattern that humans understand, rather than having
to be trained to separate styles into layout/typography/brand, or having to jump
between three media queries in order to consistently apply a change to an element
that changes appearance between mobile/tablet/desktop.

You can choose to stop using Sass at any time since it generates pure CSS files
each time you save a .scss file. See drawbacks before proceeding.

Finally, a nice side effect is that code split amongst many files makes merging,
collaborating and dealing with version control less painful.


## Drawbacks

If a team is unable or unwilling to use Sass and Compass, the .css files are
editable, but you cannot switch back to Sass once you switch to CSS. Technically
it is possible, but it will be a *HUGE* pain to get SCSS back in sync with CSS.

Besides, once you try Sass you will not want to go back :)
