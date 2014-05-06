# How To Use Pages

Pages are powered by YAML files. You can nest pages inside of folders to group them, but every page will be displayed on its own, unlike individual patterns. Page definitions contain two items; the first `includes` describes what patterns to be pulled in and rendered. Each item needs its name, the name of the file (without the `.html`), and the source, what folder it comes from. patterns can be drawn from anywhere. The second item, `overrides`, allows you to override variables from each folder. Overrides are scoped by their section, just like they are in their folder. The two sets of variables will be merged, with these variables taking precedence.

An example is provide below.

```yml
includes:
  header:
    name: header
    source: patterns
  main:
    name: article--MEDIA
    source: layouts
  footer:
    name: footer
    source: patterns
overrides:
  layouts:
    jumbotron:
      image: http://www.placecage.com/300/100
      title: Crazy Cage
```