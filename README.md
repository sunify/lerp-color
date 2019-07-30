# Linear interpolation function for colors

## Installation

`yarn add @sunify/lerp-color` or `npm install @sunify/lerp-color`

## Usage

```
/**
 * t — number 0..1
 */

(start: string, end: string, t: number) => string

// for more than 2 colors
(colors: string[], t: number) => string

// or as partial

(colors: string[]) => (t: number) => string
```

Supports arbitary (2+) amount of `rgb`, `rgba` and `hex` colors

## Examples

```es6
lerp('#FFF', '#000', 0.5); // #808080
lerp('#F00', '#000', 0.5); // #800000
lerp(['#F00', '#000', '#FFF'], 0.25); // #800000
lerp(['#F00', '#000', '#FFF'], 0.5); // #000000
lerp(['#F00', '#000', '#FFF'], 0.75); // #808080
lerp(['#F00', '#000', '#FFF'], 1); // #FFF

lerp('#FF0', 'rgba(#FF0, 0.2)', 0.5); // rgba(255, 255, 0, 0.6)
lerp('#FF0', 'rgba(#FF0, 0.2)', 1); // rgba(255, 255, 0, 0.2)
lerp('#FF0', 'rgba(#FF0, 0.2)', 0); // #FFF

/**
 * or as partial
 *
 * In this case all color will be preparsed
 * Useful for animations and similar stuff
 */

const partial = lerp(['#F00', '#000', '#FFF']);
partial(0.25); // #800000
partial(0.5); // #000000
partial(0.75); // #808080
partial(1); // #FFF
```
